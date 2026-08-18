<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

ini_set('display_errors', '0');
error_reporting(E_ALL);

const MAX_RESUME_BYTES = 10 * 1024 * 1024;
const MAX_REQUEST_BYTES = 11 * 1024 * 1024;
const MAX_DOCX_ENTRIES = 2000;
const MAX_DOCX_UNCOMPRESSED_BYTES = 50 * 1024 * 1024;

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header("Content-Security-Policy: default-src 'none'; frame-ancestors 'none'");
header('Referrer-Policy: no-referrer');

function createRequestId(): string
{
    try {
        return bin2hex(random_bytes(12));
    } catch (Throwable) {
        return hash('sha256', uniqid('career-', true) . microtime(true));
    }
}

$requestId = createRequestId();
header('X-Request-ID: ' . $requestId);

function respond(int $status, array $data): never
{
    http_response_code($status);
    echo json_encode(
        $data,
        JSON_UNESCAPED_SLASHES
            | JSON_UNESCAPED_UNICODE
            | JSON_INVALID_UTF8_SUBSTITUTE
    );
    exit;
}

function logSecurityEvent(
    string $event,
    string $severity = 'info',
    array $context = []
): void {
    global $requestId;

    $record = [
        'timestamp' => gmdate('c'),
        'request_id' => $requestId,
        'event' => $event,
        'severity' => $severity,
    ];

    foreach ($context as $key => $value) {
        if (is_scalar($value) || $value === null) {
            $record[$key] = $value;
        }
    }

    error_log(
        '[career-api] ' . json_encode(
            $record,
            JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
        )
    );
}

function getField(string $name): string
{
    $value = $_POST[$name] ?? '';

    return is_string($value) ? trim($value) : '';
}

function iniSizeToBytes(string $value): int
{
    $value = trim($value);

    if ($value === '') {
        return 0;
    }

    $unit = strtolower(substr($value, -1));
    $number = (float) $value;

    return match ($unit) {
        'g' => (int) ($number * 1024 * 1024 * 1024),
        'm' => (int) ($number * 1024 * 1024),
        'k' => (int) ($number * 1024),
        default => (int) $number,
    };
}

function getClientIp(array $config): string
{
    $remoteAddress = (string) ($_SERVER['REMOTE_ADDR'] ?? '');

    if (!empty($config['trust_cloudflare_ip_header'])) {
        $cloudflareAddress = (string) (
            $_SERVER['HTTP_CF_CONNECTING_IP'] ?? ''
        );

        if (filter_var($cloudflareAddress, FILTER_VALIDATE_IP)) {
            return $cloudflareAddress;
        }
    }

    return filter_var($remoteAddress, FILTER_VALIDATE_IP)
        ? $remoteAddress
        : 'unknown';
}

function getClientHash(string $clientIp): string
{
    return substr(hash('sha256', $clientIp), 0, 16);
}

function enforceRateLimit(
    string $clientIp,
    string $directory,
    array $rules
): int {
    if (!is_dir($directory) && !mkdir($directory, 0700, true)) {
        throw new RuntimeException('Unable to create rate-limit storage.');
    }

    if (!is_writable($directory)) {
        throw new RuntimeException('Rate-limit storage is not writable.');
    }

    $filePath = rtrim($directory, DIRECTORY_SEPARATOR)
        . DIRECTORY_SEPARATOR
        . hash('sha256', $clientIp)
        . '.json';
    $handle = fopen($filePath, 'c+');

    if ($handle === false) {
        throw new RuntimeException('Unable to open rate-limit storage.');
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            throw new RuntimeException('Unable to lock rate-limit storage.');
        }

        $contents = stream_get_contents($handle);
        $decoded = is_string($contents) && $contents !== ''
            ? json_decode($contents, true)
            : [];
        $timestamps = is_array($decoded) ? $decoded : [];
        $now = time();
        $largestWindow = max(array_map(
            static fn(array $rule): int => (int) $rule['window'],
            $rules
        ));

        $timestamps = array_values(array_filter(
            $timestamps,
            static fn($timestamp): bool => is_int($timestamp)
                && $timestamp > ($now - $largestWindow)
        ));

        $retryAfter = 0;

        foreach ($rules as $rule) {
            $window = (int) $rule['window'];
            $limit = (int) $rule['limit'];
            $withinWindow = array_values(array_filter(
                $timestamps,
                static fn(int $timestamp): bool => $timestamp > ($now - $window)
            ));

            if (count($withinWindow) >= $limit) {
                $retryAfter = max(
                    $retryAfter,
                    ($withinWindow[0] + $window) - $now
                );
            }
        }

        if ($retryAfter === 0) {
            $timestamps[] = $now;
        }

        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, json_encode($timestamps));
        fflush($handle);
        @chmod($filePath, 0600);
        flock($handle, LOCK_UN);

        return max(0, $retryAfter);
    } finally {
        fclose($handle);
    }
}

function verifyTurnstile(
    string $token,
    string $clientIp,
    string $secretKey,
    array $allowedHostnames,
    string $expectedAction
): array {
    if (!function_exists('curl_init')) {
        return [
            'valid' => false,
            'service_error' => true,
            'reason' => 'curl_unavailable',
        ];
    }

    $payload = ['secret' => $secretKey, 'response' => $token];

    if ($clientIp !== 'unknown') {
        $payload['remoteip'] = $clientIp;
    }

    $curl = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');

    if ($curl === false) {
        return [
            'valid' => false,
            'service_error' => true,
            'reason' => 'curl_init_failed',
        ];
    }

    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($payload),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => ['Accept: application/json'],
        CURLOPT_USERAGENT => 'MarianiCareerApplication/1.0',
    ]);

    $response = curl_exec($curl);
    $httpStatus = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    $curlError = curl_error($curl);
    curl_close($curl);

    if (!is_string($response) || $httpStatus !== 200) {
        return [
            'valid' => false,
            'service_error' => true,
            'reason' => $curlError !== '' ? 'transport_error' : 'http_error',
            'http_status' => $httpStatus,
        ];
    }

    $result = json_decode($response, true);

    if (!is_array($result)) {
        return [
            'valid' => false,
            'service_error' => true,
            'reason' => 'invalid_response',
        ];
    }

    if (($result['success'] ?? false) !== true) {
        $errorCodes = $result['error-codes'] ?? [];

        return [
            'valid' => false,
            'service_error' => false,
            'reason' => is_array($errorCodes)
                ? implode(',', array_map('strval', $errorCodes))
                : 'challenge_failed',
        ];
    }

    $hostname = strtolower((string) ($result['hostname'] ?? ''));
    $normalizedHostnames = array_map(
        static fn($value): string => strtolower(trim((string) $value)),
        $allowedHostnames
    );

    if (
        $normalizedHostnames === []
        || $hostname === ''
        || !in_array($hostname, $normalizedHostnames, true)
    ) {
        return [
            'valid' => false,
            'service_error' => false,
            'reason' => 'hostname_mismatch',
        ];
    }

    $action = (string) ($result['action'] ?? '');

    if ($expectedAction === '' || !hash_equals($expectedAction, $action)) {
        return [
            'valid' => false,
            'service_error' => false,
            'reason' => 'action_mismatch',
        ];
    }

    return [
        'valid' => true,
        'service_error' => false,
        'reason' => 'verified',
    ];
}

function validatePdfSignature(string $path, int $size): bool
{
    $handle = fopen($path, 'rb');

    if ($handle === false) {
        return false;
    }

    try {
        if (fread($handle, 5) !== '%PDF-') {
            return false;
        }

        $tailLength = min($size, 4096);

        if (fseek($handle, -$tailLength, SEEK_END) !== 0) {
            return false;
        }

        $tail = stream_get_contents($handle);

        return is_string($tail) && str_contains($tail, '%%EOF');
    } finally {
        fclose($handle);
    }
}

function validateDocxStructure(string $path): array
{
    if (!class_exists('ZipArchive')) {
        return [
            'valid' => false,
            'service_error' => true,
            'reason' => 'zip_extension_unavailable',
        ];
    }

    $handle = fopen($path, 'rb');

    if ($handle === false) {
        return [
            'valid' => false,
            'service_error' => false,
            'reason' => 'unreadable_file',
        ];
    }

    $signature = fread($handle, 4);
    fclose($handle);

    if ($signature !== "PK\x03\x04") {
        return [
            'valid' => false,
            'service_error' => false,
            'reason' => 'invalid_zip_signature',
        ];
    }

    $archive = new ZipArchive();
    $openResult = $archive->open($path);

    if ($openResult !== true) {
        return [
            'valid' => false,
            'service_error' => false,
            'reason' => 'invalid_zip_archive',
        ];
    }

    try {
        if ($archive->numFiles <= 0 || $archive->numFiles > MAX_DOCX_ENTRIES) {
            return [
                'valid' => false,
                'service_error' => false,
                'reason' => 'unsafe_entry_count',
            ];
        }

        $totalUncompressedBytes = 0;
        $hasContentTypes = false;
        $hasDocument = false;

        for ($index = 0; $index < $archive->numFiles; $index++) {
            $entry = $archive->statIndex($index);

            if (!is_array($entry) || !isset($entry['name'], $entry['size'])) {
                return [
                    'valid' => false,
                    'service_error' => false,
                    'reason' => 'invalid_archive_entry',
                ];
            }

            $entryName = str_replace('\\', '/', (string) $entry['name']);
            $normalizedEntryName = strtolower($entryName);

            if (
                str_starts_with($entryName, '/')
                || preg_match('#(^|/)\.\.(/|$)#', $entryName) === 1
            ) {
                return [
                    'valid' => false,
                    'service_error' => false,
                    'reason' => 'unsafe_archive_path',
                ];
            }

            if (
                $normalizedEntryName === 'word/vbaproject.bin'
                || $normalizedEntryName === 'word/vbadata.xml'
            ) {
                return [
                    'valid' => false,
                    'service_error' => false,
                    'reason' => 'macro_content_detected',
                ];
            }

            $totalUncompressedBytes += max(0, (int) $entry['size']);

            if ($totalUncompressedBytes > MAX_DOCX_UNCOMPRESSED_BYTES) {
                return [
                    'valid' => false,
                    'service_error' => false,
                    'reason' => 'expanded_size_exceeded',
                ];
            }

            $hasContentTypes = $hasContentTypes
                || $entryName === '[Content_Types].xml';
            $hasDocument = $hasDocument
                || $normalizedEntryName === 'word/document.xml';
        }

        if (!$hasContentTypes || !$hasDocument) {
            return [
                'valid' => false,
                'service_error' => false,
                'reason' => 'missing_docx_structure',
            ];
        }

        $contentTypes = $archive->getFromName('[Content_Types].xml');

        if (
            !is_string($contentTypes)
            || !str_contains(
                $contentTypes,
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml'
            )
        ) {
            return [
                'valid' => false,
                'service_error' => false,
                'reason' => 'invalid_docx_content_type',
            ];
        }

        return [
            'valid' => true,
            'service_error' => false,
            'reason' => 'verified',
        ];
    } finally {
        $archive->close();
    }
}

function sanitizeAttachmentName(
    string $originalName,
    string $extension,
    string $requestId
): string {
    $baseName = basename(str_replace('\\', '/', $originalName));
    $stem = pathinfo($baseName, PATHINFO_FILENAME);
    $stem = preg_replace('/[^A-Za-z0-9 _.-]+/', '_', $stem) ?? 'resume';
    $stem = trim($stem, " .-_\t\n\r\0\x0B");

    if ($stem === '') {
        $stem = 'resume';
    }

    return substr($stem, 0, 64)
        . '-'
        . substr($requestId, 0, 12)
        . '.'
        . $extension;
}

function writeAll($stream, string $data): bool
{
    $length = strlen($data);
    $offset = 0;

    while ($offset < $length) {
        $written = fwrite($stream, substr($data, $offset));

        if ($written === false || $written === 0) {
            return false;
        }

        $offset += $written;
    }

    return true;
}

function scanWithClamAv(string $path, array $config): array
{
    $required = !array_key_exists('require_malware_scan', $config)
        || (bool) $config['require_malware_scan'];
    $socketAddress = trim((string) ($config['clamav_socket'] ?? ''));

    if (!$required && $socketAddress === '') {
        return [
            'clean' => true,
            'service_error' => false,
            'reason' => 'scan_disabled',
        ];
    }

    if ($socketAddress === '') {
        return [
            'clean' => false,
            'service_error' => true,
            'reason' => 'scanner_not_configured',
        ];
    }

    $timeout = max(1, min(30, (int) ($config['clamav_timeout'] ?? 10)));
    $errorNumber = 0;
    $errorMessage = '';
    $socket = @stream_socket_client(
        $socketAddress,
        $errorNumber,
        $errorMessage,
        $timeout,
        STREAM_CLIENT_CONNECT
    );

    if ($socket === false) {
        return [
            'clean' => false,
            'service_error' => true,
            'reason' => 'scanner_unavailable',
        ];
    }

    stream_set_timeout($socket, $timeout);
    $file = fopen($path, 'rb');

    if ($file === false) {
        fclose($socket);

        return [
            'clean' => false,
            'service_error' => true,
            'reason' => 'file_unreadable',
        ];
    }

    try {
        if (!writeAll($socket, "zINSTREAM\0")) {
            return [
                'clean' => false,
                'service_error' => true,
                'reason' => 'scanner_write_failed',
            ];
        }

        while (!feof($file)) {
            $chunk = fread($file, 8192);

            if ($chunk === false) {
                return [
                    'clean' => false,
                    'service_error' => true,
                    'reason' => 'file_read_failed',
                ];
            }

            if (
                $chunk !== ''
                && !writeAll($socket, pack('N', strlen($chunk)) . $chunk)
            ) {
                return [
                    'clean' => false,
                    'service_error' => true,
                    'reason' => 'scanner_write_failed',
                ];
            }
        }

        if (!writeAll($socket, pack('N', 0))) {
            return [
                'clean' => false,
                'service_error' => true,
                'reason' => 'scanner_write_failed',
            ];
        }

        $response = '';

        while (!feof($socket) && strlen($response) < 4096) {
            $part = fread($socket, 512);

            if ($part === false) {
                break;
            }

            $response .= $part;

            if (str_contains($response, "\0")) {
                break;
            }
        }

        $response = trim($response, "\0\r\n ");

        if (str_ends_with($response, ' OK')) {
            return [
                'clean' => true,
                'service_error' => false,
                'reason' => 'clean',
            ];
        }

        if (str_contains($response, ' FOUND')) {
            return [
                'clean' => false,
                'service_error' => false,
                'reason' => 'malware_detected',
            ];
        }

        return [
            'clean' => false,
            'service_error' => true,
            'reason' => 'unexpected_scanner_response',
        ];
    } finally {
        fclose($file);
        fclose($socket);
    }
}

$method = (string) ($_SERVER['REQUEST_METHOD'] ?? '');
$configuredPath = getenv('CAREER_MAIL_CONFIG_PATH');
$configPath = is_string($configuredPath) && trim($configuredPath) !== ''
    ? trim($configuredPath)
    : __DIR__ . '/mail-config.php';

if (!is_file($configPath)) {
    logSecurityEvent('configuration_missing', 'error');
    respond(503, [
        'success' => false,
        'message' => 'The application service is temporarily unavailable.',
    ]);
}

try {
    $config = require $configPath;
} catch (Throwable $exception) {
    logSecurityEvent('configuration_load_failed', 'error', [
        'exception' => get_class($exception),
    ]);
    respond(503, [
        'success' => false,
        'message' => 'The application service is temporarily unavailable.',
    ]);
}

if (!is_array($config)) {
    logSecurityEvent('configuration_invalid', 'error');
    respond(503, [
        'success' => false,
        'message' => 'The application service is temporarily unavailable.',
    ]);
}

$allowedOrigins = $config['allowed_origins'] ?? [
    'https://marianimetal.com',
    'https://www.marianimetal.com',
];
$allowedOrigins = is_array($allowedOrigins) ? $allowedOrigins : [];
$origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');

if ($origin !== '' && !in_array($origin, $allowedOrigins, true)) {
    logSecurityEvent('origin_rejected', 'warning');
    respond(403, [
        'success' => false,
        'message' => 'Request origin is not permitted.',
    ]);
}

if ($origin !== '') {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
    header('Access-Control-Max-Age: 600');
}

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method !== 'POST') {
    header('Allow: POST, OPTIONS');
    respond(405, [
        'success' => false,
        'message' => 'Method not allowed.',
    ]);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
$postMaximum = iniSizeToBytes((string) ini_get('post_max_size'));

if (
    $contentLength <= 0
    || $contentLength > MAX_REQUEST_BYTES
    || ($postMaximum > 0 && $contentLength > $postMaximum)
) {
    logSecurityEvent('request_size_rejected', 'warning', [
        'content_length' => $contentLength,
    ]);
    respond(413, [
        'success' => false,
        'message' => 'The application is too large. Please upload a smaller resume.',
    ]);
}

$clientIp = getClientIp($config);
$clientHash = getClientHash($clientIp);
$rateLimitDirectory = (string) (
    $config['rate_limit_directory']
    ?? (sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'mariani-career-rate-limit')
);
$rateLimitRules = [
    [
        'window' => 15 * 60,
        'limit' => max(1, min(20, (int) ($config['rate_limit_15_minutes'] ?? 5))),
    ],
    [
        'window' => 24 * 60 * 60,
        'limit' => max(1, min(100, (int) ($config['rate_limit_daily'] ?? 20))),
    ],
];

try {
    $retryAfter = enforceRateLimit(
        $clientIp,
        $rateLimitDirectory,
        $rateLimitRules
    );
} catch (Throwable $exception) {
    logSecurityEvent('rate_limit_storage_failed', 'error', [
        'client_hash' => $clientHash,
        'exception' => get_class($exception),
    ]);
    respond(503, [
        'success' => false,
        'message' => 'The application service is temporarily unavailable.',
    ]);
}

if ($retryAfter > 0) {
    header('Retry-After: ' . $retryAfter);
    logSecurityEvent('rate_limit_exceeded', 'warning', [
        'client_hash' => $clientHash,
        'retry_after' => $retryAfter,
    ]);
    respond(429, [
        'success' => false,
        'message' => 'Too many submissions. Please try again later.',
    ]);
}

if (getField('_gotcha') !== '') {
    logSecurityEvent('honeypot_triggered', 'warning', [
        'client_hash' => $clientHash,
    ]);
    respond(200, [
        'success' => true,
        'message' => 'Application received.',
    ]);
}

$requiredConfigKeys = [
    'smtp_host',
    'smtp_port',
    'smtp_secure',
    'smtp_username',
    'smtp_password',
    'from_email',
    'from_name',
    'recipient_email',
    'recipient_name',
    'turnstile_secret_key',
];

foreach ($requiredConfigKeys as $key) {
    if (
        !array_key_exists($key, $config)
        || trim((string) $config[$key]) === ''
    ) {
        logSecurityEvent('configuration_key_missing', 'error', ['key' => $key]);
        respond(503, [
            'success' => false,
            'message' => 'The application service is temporarily unavailable.',
        ]);
    }
}

$turnstileToken = getField('cf-turnstile-response');

if ($turnstileToken === '' || strlen($turnstileToken) > 2048) {
    logSecurityEvent('turnstile_token_missing', 'warning', [
        'client_hash' => $clientHash,
    ]);
    respond(422, [
        'success' => false,
        'message' => 'Please complete the security verification.',
    ]);
}

$turnstileAllowedHostnames = $config['turnstile_allowed_hostnames'] ?? [
    'marianimetal.com',
    'www.marianimetal.com',
];
$turnstileAllowedHostnames = is_array($turnstileAllowedHostnames)
    ? $turnstileAllowedHostnames
    : [];
$turnstileAction = trim(
    (string) ($config['turnstile_action'] ?? 'career_application')
);

if ($turnstileAction === '') {
    logSecurityEvent('turnstile_action_missing', 'error');
    respond(503, [
        'success' => false,
        'message' => 'The application service is temporarily unavailable.',
    ]);
}

$turnstileResult = verifyTurnstile(
    $turnstileToken,
    $clientIp,
    (string) $config['turnstile_secret_key'],
    $turnstileAllowedHostnames,
    $turnstileAction
);

if (!$turnstileResult['valid']) {
    $serviceError = (bool) $turnstileResult['service_error'];
    logSecurityEvent(
        'turnstile_verification_failed',
        $serviceError ? 'error' : 'warning',
        [
            'client_hash' => $clientHash,
            'reason' => (string) $turnstileResult['reason'],
        ]
    );
    respond($serviceError ? 503 : 422, [
        'success' => false,
        'message' => $serviceError
            ? 'Security verification is temporarily unavailable. Please try again.'
            : 'Security verification failed. Please try again.',
    ]);
}

$firstName = getField('firstName');
$lastName = getField('lastName');
$email = getField('email');
$phone = getField('phone');
$areaOfInterest = getField('areaOfInterest');
$preferredLocation = getField('preferredLocation');
$message = getField('message');
$positionAppliedFor = getField('positionAppliedFor');
$positionLocation = getField('positionLocation');
$positionDepartment = getField('positionDepartment');
$applicationRegion = getField('applicationRegion');

if (
    $firstName === ''
    || $lastName === ''
    || $email === ''
    || $areaOfInterest === ''
    || $preferredLocation === ''
) {
    respond(422, [
        'success' => false,
        'message' => 'Please complete all required fields.',
    ]);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, [
        'success' => false,
        'message' => 'Please enter a valid email address.',
    ]);
}

if (
    strlen($firstName) > 100
    || strlen($lastName) > 100
    || strlen($email) > 254
    || strlen($phone) > 50
    || strlen($areaOfInterest) > 150
    || strlen($preferredLocation) > 100
    || strlen($positionAppliedFor) > 150
    || strlen($positionLocation) > 150
    || strlen($positionDepartment) > 150
    || strlen($applicationRegion) > 100
    || strlen($message) > 5000
) {
    respond(422, [
        'success' => false,
        'message' => 'One or more form fields are too long.',
    ]);
}

foreach ([
    $firstName,
    $lastName,
    $email,
    $positionAppliedFor,
    $positionLocation,
    $positionDepartment,
] as $headerValue) {
    if (preg_match('/[\r\n\0]/', $headerValue) === 1) {
        logSecurityEvent('header_control_character_rejected', 'warning', [
            'client_hash' => $clientHash,
        ]);
        respond(422, [
            'success' => false,
            'message' => 'One or more form fields contain unsupported characters.',
        ]);
    }
}

if (str_contains($message, "\0")) {
    respond(422, [
        'success' => false,
        'message' => 'The message contains unsupported characters.',
    ]);
}

if (!isset($_FILES['resume']) || !is_array($_FILES['resume'])) {
    respond(422, [
        'success' => false,
        'message' => 'Please upload your resume.',
    ]);
}

$resume = $_FILES['resume'];
$requiredFileKeys = ['name', 'tmp_name', 'error', 'size'];

foreach ($requiredFileKeys as $key) {
    if (!array_key_exists($key, $resume) || is_array($resume[$key])) {
        respond(422, [
            'success' => false,
            'message' => 'Invalid resume upload.',
        ]);
    }
}

$uploadError = (int) $resume['error'];

if ($uploadError !== UPLOAD_ERR_OK) {
    $uploadErrors = [
        UPLOAD_ERR_INI_SIZE => 'The resume exceeds the server upload limit.',
        UPLOAD_ERR_FORM_SIZE => 'The resume exceeds the allowed upload limit.',
        UPLOAD_ERR_PARTIAL => 'The resume was only partially uploaded.',
        UPLOAD_ERR_NO_FILE => 'Please select a resume.',
        UPLOAD_ERR_NO_TMP_DIR => 'The server upload directory is unavailable.',
        UPLOAD_ERR_CANT_WRITE => 'The server could not process the uploaded resume.',
        UPLOAD_ERR_EXTENSION => 'The server rejected the uploaded resume.',
    ];

    logSecurityEvent('upload_error', 'warning', [
        'client_hash' => $clientHash,
        'upload_error' => $uploadError,
    ]);
    respond(422, [
        'success' => false,
        'message' => $uploadErrors[$uploadError]
            ?? 'The resume could not be uploaded.',
    ]);
}

$resumeSize = (int) $resume['size'];

if ($resumeSize <= 0 || $resumeSize > MAX_RESUME_BYTES) {
    respond(422, [
        'success' => false,
        'message' => $resumeSize <= 0
            ? 'The uploaded resume is empty.'
            : 'Please upload a resume smaller than 10 MB.',
    ]);
}

$temporaryPath = (string) $resume['tmp_name'];

if (!is_uploaded_file($temporaryPath)) {
    logSecurityEvent('non_http_upload_rejected', 'warning', [
        'client_hash' => $clientHash,
    ]);
    respond(422, [
        'success' => false,
        'message' => 'Invalid uploaded file.',
    ]);
}

$resolvedTemporaryPath = realpath($temporaryPath);
$resolvedDocumentRoot = realpath((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''));

if ($resolvedTemporaryPath === false) {
    respond(422, [
        'success' => false,
        'message' => 'The uploaded resume could not be validated.',
    ]);
}

if (function_exists('chmod')) {
    @chmod($resolvedTemporaryPath, 0600);
}

if (is_executable($resolvedTemporaryPath)) {
    logSecurityEvent('executable_upload_rejected', 'error', [
        'client_hash' => $clientHash,
    ]);
    respond(503, [
        'success' => false,
        'message' => 'The application service is temporarily unavailable.',
    ]);
}

if (
    $resolvedDocumentRoot !== false
    && str_starts_with(
        $resolvedTemporaryPath,
        rtrim($resolvedDocumentRoot, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR
    )
) {
    logSecurityEvent('unsafe_upload_directory', 'error');
    respond(503, [
        'success' => false,
        'message' => 'The application service is temporarily unavailable.',
    ]);
}

$originalFileName = (string) $resume['name'];

if ($originalFileName === '' || strlen($originalFileName) > 255) {
    respond(422, [
        'success' => false,
        'message' => 'The resume filename is invalid or too long.',
    ]);
}

$normalizedFileName = basename(str_replace('\\', '/', $originalFileName));
$fileExtension = strtolower(pathinfo($normalizedFileName, PATHINFO_EXTENSION));

if (!in_array($fileExtension, ['pdf', 'docx'], true)) {
    respond(422, [
        'success' => false,
        'message' => 'Only PDF and DOCX files are permitted.',
    ]);
}

if (!class_exists('finfo')) {
    logSecurityEvent('fileinfo_extension_unavailable', 'error');
    respond(503, [
        'success' => false,
        'message' => 'The application service is temporarily unavailable.',
    ]);
}

$fileInfo = new finfo(FILEINFO_MIME_TYPE);
$detectedMimeType = $fileInfo->file($resolvedTemporaryPath);
$allowedMimeTypes = [
    'pdf' => ['application/pdf'],
    'docx' => [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/zip',
    ],
];

if (
    !is_string($detectedMimeType)
    || !in_array($detectedMimeType, $allowedMimeTypes[$fileExtension], true)
) {
    logSecurityEvent('mime_type_rejected', 'warning', [
        'client_hash' => $clientHash,
        'extension' => $fileExtension,
        'mime_type' => is_string($detectedMimeType)
            ? $detectedMimeType
            : 'unknown',
    ]);
    respond(422, [
        'success' => false,
        'message' => 'The uploaded resume has an unsupported file type.',
    ]);
}

if ($fileExtension === 'pdf') {
    $signatureValid = validatePdfSignature(
        $resolvedTemporaryPath,
        $resumeSize
    );
    $signatureServiceError = false;
    $signatureReason = 'invalid_pdf_signature';
} else {
    $docxResult = validateDocxStructure($resolvedTemporaryPath);
    $signatureValid = (bool) $docxResult['valid'];
    $signatureServiceError = (bool) $docxResult['service_error'];
    $signatureReason = (string) $docxResult['reason'];
}

if (!$signatureValid) {
    logSecurityEvent(
        'file_signature_rejected',
        $signatureServiceError ? 'error' : 'warning',
        [
            'client_hash' => $clientHash,
            'extension' => $fileExtension,
            'reason' => $signatureReason,
        ]
    );
    respond($signatureServiceError ? 503 : 422, [
        'success' => false,
        'message' => $signatureServiceError
            ? 'The application service is temporarily unavailable.'
            : 'The uploaded resume is not a valid PDF or DOCX file.',
    ]);
}

$scanResult = scanWithClamAv($resolvedTemporaryPath, $config);

if (!$scanResult['clean']) {
    $scanServiceError = (bool) $scanResult['service_error'];
    logSecurityEvent(
        'malware_scan_rejected',
        $scanServiceError ? 'error' : 'warning',
        [
            'client_hash' => $clientHash,
            'extension' => $fileExtension,
            'reason' => (string) $scanResult['reason'],
        ]
    );
    respond($scanServiceError ? 503 : 422, [
        'success' => false,
        'message' => $scanServiceError
            ? 'Resume scanning is temporarily unavailable. Please try again.'
            : 'The uploaded resume did not pass the security scan.',
    ]);
}

$phpMailerFiles = [
    __DIR__ . '/PHPMailer/src/Exception.php',
    __DIR__ . '/PHPMailer/src/PHPMailer.php',
    __DIR__ . '/PHPMailer/src/SMTP.php',
];

foreach ($phpMailerFiles as $phpMailerFile) {
    if (!is_file($phpMailerFile)) {
        logSecurityEvent('mailer_dependency_missing', 'error');
        respond(503, [
            'success' => false,
            'message' => 'The application service is temporarily unavailable.',
        ]);
    }
}

try {
    foreach ($phpMailerFiles as $phpMailerFile) {
        require $phpMailerFile;
    }
} catch (Throwable $exception) {
    logSecurityEvent('mailer_dependency_load_failed', 'error', [
        'exception' => get_class($exception),
    ]);
    respond(503, [
        'success' => false,
        'message' => 'The application service is temporarily unavailable.',
    ]);
}

$fullName = trim($firstName . ' ' . $lastName);
$safePosition = $positionAppliedFor !== ''
    ? $positionAppliedFor
    : 'General Application';
$attachmentName = sanitizeAttachmentName(
    $normalizedFileName,
    $fileExtension,
    $requestId
);
$emailBody = implode(PHP_EOL, [
    'New Career Application',
    '',
    'Applicant Details',
    '-------------------------',
    'Name: ' . $fullName,
    'Email: ' . $email,
    'Phone: ' . ($phone !== '' ? $phone : 'Not provided'),
    '',
    'Application Details',
    '-------------------------',
    'Position: ' . $safePosition,
    'Position Location: ' . (
        $positionLocation !== '' ? $positionLocation : 'Not specified'
    ),
    'Department: ' . (
        $positionDepartment !== '' ? $positionDepartment : 'Not specified'
    ),
    'Area of Interest: ' . $areaOfInterest,
    'Preferred Location: ' . $preferredLocation,
    'Application Region: ' . (
        $applicationRegion !== '' ? $applicationRegion : 'Not specified'
    ),
    '',
    'Additional Information',
    '-------------------------',
    $message !== '' ? $message : 'No additional information provided.',
]);

$smtpSecurity = strtolower((string) $config['smtp_secure']);

if (!in_array($smtpSecurity, ['ssl', 'smtps', 'tls', 'starttls'], true)) {
    logSecurityEvent('smtp_encryption_invalid', 'error');
    respond(503, [
        'success' => false,
        'message' => 'The application service is temporarily unavailable.',
    ]);
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->SMTPDebug = 0;
    $mail->Timeout = 30;
    $mail->Host = (string) $config['smtp_host'];
    $mail->SMTPAuth = true;
    $mail->Username = (string) $config['smtp_username'];
    $mail->Password = (string) $config['smtp_password'];
    $mail->Port = (int) $config['smtp_port'];
    $mail->SMTPSecure = in_array($smtpSecurity, ['ssl', 'smtps'], true)
        ? PHPMailer::ENCRYPTION_SMTPS
        : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->SMTPAutoTLS = true;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->setFrom(
        (string) $config['from_email'],
        (string) $config['from_name']
    );
    $mail->addAddress(
        (string) $config['recipient_email'],
        (string) $config['recipient_name']
    );
    $mail->addReplyTo($email, $fullName);
    $mail->Subject = 'Career Application - ' . $safePosition;
    $mail->isHTML(false);
    $mail->Body = $emailBody;
    $mail->addAttachment($resolvedTemporaryPath, $attachmentName);
    $mail->send();

    logSecurityEvent('application_sent', 'info', [
        'client_hash' => $clientHash,
        'extension' => $fileExtension,
        'file_size' => $resumeSize,
    ]);
    respond(200, [
        'success' => true,
        'message' => 'Thank you. Your application has been submitted to our hiring team.',
    ]);
} catch (Throwable $exception) {
    logSecurityEvent('application_email_failed', 'error', [
        'client_hash' => $clientHash,
        'exception' => get_class($exception),
    ]);
    respond(500, [
        'success' => false,
        'message' => 'We could not submit your application. Please try again.',
    ]);
}
