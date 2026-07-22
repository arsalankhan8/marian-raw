<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

ini_set('display_errors', '0');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

// Optional CORS support for local Vite testing.
// Remove localhost entries after testing if you do not need them.
$allowedOrigins = [
    'https://marianimetal.com',
    'https://www.marianimetal.com',
    'https://mariani-stagging.netlify.app',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
];

$origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');

if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

$config = require __DIR__ . '/mail-config.php';

function respond(int $status, array $data): never
{
    http_response_code($status);

    echo json_encode(
        $data,
        JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
    );

    exit;
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

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, [
        'success' => false,
        'message' => 'Method not allowed.',
    ]);
}

// Detect requests rejected by PHP because post_max_size was exceeded.
$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
$postMaximum = iniSizeToBytes((string) ini_get('post_max_size'));

if ($postMaximum > 0 && $contentLength > $postMaximum) {
    respond(413, [
        'success' => false,
        'message' => 'The application is too large. Please upload a smaller resume.',
    ]);
}

// Honeypot spam protection.
if (getField('_gotcha') !== '') {
    respond(200, [
        'success' => true,
        'message' => 'Application received.',
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
    $firstName === '' ||
    $lastName === '' ||
    $email === '' ||
    $areaOfInterest === '' ||
    $preferredLocation === ''
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

// Basic field-length protection.
if (
    strlen($firstName) > 100 ||
    strlen($lastName) > 100 ||
    strlen($email) > 254 ||
    strlen($phone) > 50 ||
    strlen($areaOfInterest) > 150 ||
    strlen($preferredLocation) > 100 ||
    strlen($positionAppliedFor) > 150 ||
    strlen($positionLocation) > 150 ||
    strlen($positionDepartment) > 150 ||
    strlen($applicationRegion) > 100 ||
    strlen($message) > 5000
) {
    respond(422, [
        'success' => false,
        'message' => 'One or more form fields are too long.',
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

    respond(422, [
        'success' => false,
        'message' => $uploadErrors[$uploadError]
            ?? 'The resume could not be uploaded.',
    ]);
}

$resumeSize = (int) $resume['size'];
$maximumFileSize = 10 * 1024 * 1024;

if ($resumeSize <= 0) {
    respond(422, [
        'success' => false,
        'message' => 'The uploaded resume is empty.',
    ]);
}

if ($resumeSize > $maximumFileSize) {
    respond(422, [
        'success' => false,
        'message' => 'Please upload a resume smaller than 10 MB.',
    ]);
}

$temporaryPath = (string) $resume['tmp_name'];

if (!is_uploaded_file($temporaryPath)) {
    respond(422, [
        'success' => false,
        'message' => 'Invalid uploaded file.',
    ]);
}

$originalFileName = basename((string) $resume['name']);
$originalFileName = preg_replace('/[\x00-\x1F\x7F]+/u', '', $originalFileName)
    ?: 'resume';

$fileExtension = strtolower(
    pathinfo($originalFileName, PATHINFO_EXTENSION)
);

$allowedExtensions = ['pdf', 'doc', 'docx'];

if (!in_array($fileExtension, $allowedExtensions, true)) {
    respond(422, [
        'success' => false,
        'message' => 'Only PDF, DOC, and DOCX files are permitted.',
    ]);
}

if (!class_exists('finfo')) {
    respond(500, [
        'success' => false,
        'message' => 'The server cannot validate uploaded files.',
    ]);
}

$fileInfo = new finfo(FILEINFO_MIME_TYPE);
$detectedMimeType = $fileInfo->file($temporaryPath);

if (!is_string($detectedMimeType) || $detectedMimeType === '') {
    respond(422, [
        'success' => false,
        'message' => 'The uploaded resume could not be validated.',
    ]);
}

$allowedMimeTypesByExtension = [
    'pdf' => [
        'application/pdf',
    ],
    'doc' => [
        'application/msword',
        'application/CDFV2',
        'application/x-ole-storage',
        'application/octet-stream',
    ],
    'docx' => [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/zip',
        'application/octet-stream',
    ],
];

if (
    !isset($allowedMimeTypesByExtension[$fileExtension]) ||
    !in_array(
        $detectedMimeType,
        $allowedMimeTypesByExtension[$fileExtension],
        true
    )
) {
    respond(422, [
        'success' => false,
        'message' => 'The uploaded resume has an unsupported file type.',
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
];

foreach ($requiredConfigKeys as $key) {
    if (
        !array_key_exists($key, $config) ||
        trim((string) $config[$key]) === ''
    ) {
        error_log('Career application configuration is missing: ' . $key);

        respond(500, [
            'success' => false,
            'message' => 'The application email service is not configured.',
        ]);
    }
}

$fullName = trim($firstName . ' ' . $lastName);
$safePosition = $positionAppliedFor !== ''
    ? $positionAppliedFor
    : 'General Application';

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

    $smtpSecurity = strtolower((string) $config['smtp_secure']);

    if (in_array($smtpSecurity, ['ssl', 'smtps'], true)) {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif (in_array($smtpSecurity, ['tls', 'starttls'], true)) {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    } else {
        $mail->SMTPSecure = false;
        $mail->SMTPAutoTLS = false;
    }

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

    $mail->addAttachment(
        $temporaryPath,
        $originalFileName
    );

    $mail->send();

    respond(200, [
        'success' => true,
        'message' => 'Thank you. Your application has been submitted to our hiring team.',
    ]);
} catch (Exception $exception) {
    error_log(
        'Career application email error: ' .
        $mail->ErrorInfo
    );

    respond(500, [
        'success' => false,
        'message' => 'We could not submit your application. Please try again.',
    ]);
}
