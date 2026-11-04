<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

ini_set('display_errors', '0');
error_reporting(E_ALL);

const MAX_CONTACT_REQUEST_BYTES = 64 * 1024;

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header("Content-Security-Policy: default-src 'none'; frame-ancestors 'none'");
header('Referrer-Policy: no-referrer');

function createContactRequestId(): string
{
    try {
        return bin2hex(random_bytes(12));
    } catch (Throwable) {
        return hash('sha256', uniqid('contact-', true) . microtime(true));
    }
}

$requestId = createContactRequestId();
header('X-Request-ID: ' . $requestId);

function contactRespond(int $status, array $data): never
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

function logContactSecurityEvent(
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
        '[contact-api] ' . json_encode(
            $record,
            JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
        )
    );
}

function getContactField(string $name): string
{
    $value = $_POST[$name] ?? '';

    return is_string($value) ? trim($value) : '';
}

function getContactClientIp(array $config): string
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

function enforceContactRateLimit(
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
        . 'contact-'
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

function verifyContactTurnstile(
    string $token,
    string $clientIp,
    string $secretKey,
    array $allowedHostnames,
    string $expectedAction
): array {
    if (!function_exists('curl_init')) {
        return ['valid' => false, 'service_error' => true, 'reason' => 'curl_unavailable'];
    }

    $payload = ['secret' => $secretKey, 'response' => $token];

    if ($clientIp !== 'unknown') {
        $payload['remoteip'] = $clientIp;
    }

    $curl = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');

    if ($curl === false) {
        return ['valid' => false, 'service_error' => true, 'reason' => 'curl_init_failed'];
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
        CURLOPT_USERAGENT => 'MarianiContactForm/1.0',
    ]);

    $response = curl_exec($curl);
    $httpStatus = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    curl_close($curl);

    if (!is_string($response) || $httpStatus !== 200) {
        return ['valid' => false, 'service_error' => true, 'reason' => 'transport_error'];
    }

    $result = json_decode($response, true);

    if (!is_array($result)) {
        return ['valid' => false, 'service_error' => true, 'reason' => 'invalid_response'];
    }

    if (($result['success'] ?? false) !== true) {
        return ['valid' => false, 'service_error' => false, 'reason' => 'challenge_failed'];
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
        return ['valid' => false, 'service_error' => false, 'reason' => 'hostname_mismatch'];
    }

    $action = (string) ($result['action'] ?? '');

    if ($expectedAction === '' || !hash_equals($expectedAction, $action)) {
        return ['valid' => false, 'service_error' => false, 'reason' => 'action_mismatch'];
    }

    return ['valid' => true, 'service_error' => false, 'reason' => 'verified'];
}

$method = (string) ($_SERVER['REQUEST_METHOD'] ?? '');
$configuredPath = getenv('CAREER_MAIL_CONFIG_PATH');
$configPath = is_string($configuredPath) && trim($configuredPath) !== ''
    ? trim($configuredPath)
    : __DIR__ . '/mail-config.php';

if (!is_file($configPath)) {
    logContactSecurityEvent('configuration_missing', 'error');
    contactRespond(503, ['success' => false, 'message' => 'The contact service is temporarily unavailable.']);
}

try {
    $config = require $configPath;
} catch (Throwable $exception) {
    logContactSecurityEvent('configuration_load_failed', 'error', ['exception' => get_class($exception)]);
    contactRespond(503, ['success' => false, 'message' => 'The contact service is temporarily unavailable.']);
}

if (!is_array($config)) {
    contactRespond(503, ['success' => false, 'message' => 'The contact service is temporarily unavailable.']);
}

$allowedOrigins = $config['allowed_origins'] ?? [];
$allowedOrigins = is_array($allowedOrigins) ? $allowedOrigins : [];
$origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');

if ($origin !== '' && !in_array($origin, $allowedOrigins, true)) {
    logContactSecurityEvent('origin_rejected', 'warning');
    contactRespond(403, ['success' => false, 'message' => 'Request origin is not permitted.']);
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
    contactRespond(405, ['success' => false, 'message' => 'Method not allowed.']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);

if ($contentLength <= 0 || $contentLength > MAX_CONTACT_REQUEST_BYTES) {
    logContactSecurityEvent('request_size_rejected', 'warning', ['content_length' => $contentLength]);
    contactRespond(413, ['success' => false, 'message' => 'The request is too large.']);
}

$clientIp = getContactClientIp($config);
$clientHash = substr(hash('sha256', $clientIp), 0, 16);
$rateLimitDirectory = (string) (
    $config['rate_limit_directory']
    ?? (sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'mariani-form-rate-limit')
);
$rateLimitRules = [
    [
        'window' => 15 * 60,
        'limit' => max(1, min(30, (int) ($config['contact_rate_limit_15_minutes'] ?? 5))),
    ],
    [
        'window' => 24 * 60 * 60,
        'limit' => max(1, min(100, (int) ($config['contact_rate_limit_daily'] ?? 20))),
    ],
];

try {
    $retryAfter = enforceContactRateLimit($clientIp, $rateLimitDirectory, $rateLimitRules);
} catch (Throwable $exception) {
    logContactSecurityEvent('rate_limit_storage_failed', 'error', [
        'client_hash' => $clientHash,
        'exception' => get_class($exception),
    ]);
    contactRespond(503, ['success' => false, 'message' => 'The contact service is temporarily unavailable.']);
}

if ($retryAfter > 0) {
    header('Retry-After: ' . $retryAfter);
    contactRespond(429, ['success' => false, 'message' => 'Too many submissions. Please try again later.']);
}

if (getContactField('bot-field') !== '' || getContactField('_gotcha') !== '') {
    logContactSecurityEvent('honeypot_triggered', 'warning', ['client_hash' => $clientHash]);
    contactRespond(200, ['success' => true, 'message' => 'Message received.']);
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
    if (!array_key_exists($key, $config) || trim((string) $config[$key]) === '') {
        logContactSecurityEvent('configuration_key_missing', 'error', ['key' => $key]);
        contactRespond(503, ['success' => false, 'message' => 'The contact service is temporarily unavailable.']);
    }
}

$turnstileToken = getContactField('cf-turnstile-response');

if ($turnstileToken === '' || strlen($turnstileToken) > 2048) {
    contactRespond(422, ['success' => false, 'message' => 'Please complete the security verification.']);
}

$turnstileAllowedHostnames = $config['turnstile_allowed_hostnames'] ?? [];
$turnstileAllowedHostnames = is_array($turnstileAllowedHostnames)
    ? $turnstileAllowedHostnames
    : [];
$turnstileAction = trim((string) ($config['turnstile_contact_action'] ?? 'contact_form'));
$turnstileResult = verifyContactTurnstile(
    $turnstileToken,
    $clientIp,
    (string) $config['turnstile_secret_key'],
    $turnstileAllowedHostnames,
    $turnstileAction
);

if (!$turnstileResult['valid']) {
    $serviceError = (bool) $turnstileResult['service_error'];
    logContactSecurityEvent('turnstile_verification_failed', $serviceError ? 'error' : 'warning', [
        'client_hash' => $clientHash,
        'reason' => (string) $turnstileResult['reason'],
    ]);
    contactRespond($serviceError ? 503 : 422, [
        'success' => false,
        'message' => $serviceError
            ? 'Security verification is temporarily unavailable. Please try again.'
            : 'Security verification failed. Please try again.',
    ]);
}

$fullName = getContactField('fullName');
$phone = getContactField('phone');
$email = getContactField('email');
$message = getContactField('message');
$marketingConsent = in_array(
    strtolower(getContactField('marketingConsent') ?: getContactField('consent')),
    ['1', 'yes', 'true', 'on'],
    true
);

if ($fullName === '' || $email === '' || $message === '') {
    contactRespond(422, ['success' => false, 'message' => 'Please complete all required fields.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    contactRespond(422, ['success' => false, 'message' => 'Please enter a valid email address.']);
}

if (
    strlen($fullName) > 150
    || strlen($phone) > 50
    || strlen($email) > 254
    || strlen($message) > 5000
) {
    contactRespond(422, ['success' => false, 'message' => 'One or more form fields are too long.']);
}

foreach ([$fullName, $email] as $headerValue) {
    if (preg_match('/[\r\n\0]/', $headerValue) === 1) {
        contactRespond(422, ['success' => false, 'message' => 'One or more fields contain unsupported characters.']);
    }
}

if (str_contains($message, "\0")) {
    contactRespond(422, ['success' => false, 'message' => 'The message contains unsupported characters.']);
}

$phpMailerFiles = [
    __DIR__ . '/PHPMailer/src/Exception.php',
    __DIR__ . '/PHPMailer/src/PHPMailer.php',
    __DIR__ . '/PHPMailer/src/SMTP.php',
];

foreach ($phpMailerFiles as $phpMailerFile) {
    if (!is_file($phpMailerFile)) {
        logContactSecurityEvent('mailer_dependency_missing', 'error');
        contactRespond(503, ['success' => false, 'message' => 'The contact service is temporarily unavailable.']);
    }
}

try {
    foreach ($phpMailerFiles as $phpMailerFile) {
        require $phpMailerFile;
    }
} catch (Throwable $exception) {
    logContactSecurityEvent('mailer_dependency_load_failed', 'error', [
        'exception' => get_class($exception),
    ]);
    contactRespond(503, ['success' => false, 'message' => 'The contact service is temporarily unavailable.']);
}

$smtpSecurity = strtolower((string) $config['smtp_secure']);

if (!in_array($smtpSecurity, ['ssl', 'smtps', 'tls', 'starttls'], true)) {
    contactRespond(503, ['success' => false, 'message' => 'The contact service is temporarily unavailable.']);
}

$recipientEmail = trim((string) ($config['contact_recipient_email'] ?? ''));
$recipientName = trim((string) ($config['contact_recipient_name'] ?? ''));
$recipientEmail = $recipientEmail !== '' ? $recipientEmail : (string) $config['recipient_email'];
$recipientName = $recipientName !== '' ? $recipientName : (string) $config['recipient_name'];

$emailBody = implode(PHP_EOL, [
    'New Website Contact Message',
    '',
    'Name: ' . $fullName,
    'Email: ' . $email,
    'Phone: ' . ($phone !== '' ? $phone : 'Not provided'),
    'Marketing consent: ' . ($marketingConsent ? 'Yes' : 'No'),
    '',
    'Message',
    '-------------------------',
    $message,
]);

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
    $mail->setFrom((string) $config['from_email'], (string) $config['from_name']);
    $mail->addAddress($recipientEmail, $recipientName);
    $mail->addReplyTo($email, $fullName);
    $mail->Subject = 'Website Contact Form';
    $mail->isHTML(false);
    $mail->Body = $emailBody;
    $mail->send();

    logContactSecurityEvent('message_sent', 'info', ['client_hash' => $clientHash]);
    contactRespond(200, ['success' => true, 'message' => 'Thank you. Your message has been sent.']);
} catch (Throwable $exception) {
    logContactSecurityEvent('message_email_failed', 'error', [
        'client_hash' => $clientHash,
        'exception' => get_class($exception),
    ]);
    contactRespond(500, ['success' => false, 'message' => 'We could not send your message. Please try again.']);
}
