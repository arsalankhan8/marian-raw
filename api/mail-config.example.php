<?php

declare(strict_types=1);

return [
    'smtp_host' => getenv('CAREERS_SMTP_HOST') ?: '',
    'smtp_port' => (int) (getenv('CAREERS_SMTP_PORT') ?: 587),
    'smtp_secure' => getenv('CAREERS_SMTP_SECURE') ?: 'tls',
    'smtp_username' => getenv('CAREERS_SMTP_USERNAME') ?: '',
    'smtp_password' => getenv('CAREERS_SMTP_PASSWORD') ?: '',
    'from_email' => getenv('CAREERS_FROM_EMAIL') ?: '',
    'from_name' => getenv('CAREERS_FROM_NAME') ?: 'Mariani Careers',
    'recipient_email' => getenv('CAREERS_RECIPIENT_EMAIL') ?: '',
    'recipient_name' => getenv('CAREERS_RECIPIENT_NAME') ?: 'Mariani Hiring Team',

    'turnstile_secret_key' => getenv('TURNSTILE_SECRET_KEY') ?: '',
    'turnstile_action' => 'career_application',
    'turnstile_allowed_hostnames' => [
        'marianimetal.com',
        'www.marianimetal.com',
    ],
    'allowed_origins' => [
        'https://marianimetal.com',
        'https://www.marianimetal.com',
    ],

    // Only enable this when the origin accepts traffic exclusively from Cloudflare.
    'trust_cloudflare_ip_header' => false,
    'rate_limit_directory' => sys_get_temp_dir()
        . DIRECTORY_SEPARATOR
        . 'mariani-career-rate-limit',
    'rate_limit_15_minutes' => 5,
    'rate_limit_daily' => 20,

    // Fail closed unless the uploaded resume is scanned by clamd.
    'require_malware_scan' => true,
    'clamav_socket' => 'tcp://127.0.0.1:3310',
    'clamav_timeout' => 10,
];
