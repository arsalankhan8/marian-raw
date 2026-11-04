# Secure forms API deployment

The careers and contact APIs fail closed until their server-side controls are configured.

## Required runtime configuration

1. Prefer providing an equivalent configuration file from the deployment
   secret store and setting `CAREER_MAIL_CONFIG_PATH` to its absolute path
   outside the document root. If the local `api/mail-config.php` fallback is
   used, keep it outside source control and apply the API access rule below.
2. Set the SMTP and Turnstile secrets on the server. Set the Turnstile action
   to `career_application` for applications and `contact_form` for contact
   requests. Never expose the Turnstile secret through a
   `VITE_` variable; only the public site key belongs there.
3. Install and run `clamd`, keep its signatures updated, and configure
   `clamav_socket`. Leave `require_malware_scan` enabled in production.
4. Confirm PHP has the `curl`, `fileinfo`, and `zip` extensions enabled.
5. Ensure PHP's `upload_tmp_dir` is outside the document root and is not
   executable or web-accessible. The API rejects uploads resolved under the
   document root and never moves uploaded files into the site tree.
6. Ensure `rate_limit_directory` is outside the document root, writable only by
   the PHP worker, and periodically remove files older than two days.
7. Set `VITE_TURNSTILE_SITE_KEY` during the frontend production build.
8. Set `VITE_TALENT_API_ENDPOINT=/api/career-application.php` and
   `VITE_CONTACT_API_ENDPOINT=/api/contact.php` during the frontend build.
9. Provide `CAREERS_SMTP_HOST`, `CAREERS_SMTP_PORT`,
   `CAREERS_SMTP_SECURE`, `CAREERS_SMTP_USERNAME`,
   `CAREERS_SMTP_PASSWORD`, `CAREERS_FROM_EMAIL`,
   `CAREERS_RECIPIENT_EMAIL`, and `TURNSTILE_SECRET_KEY` through the server
   secret store. Optionally set `CONTACT_RECIPIENT_EMAIL` and
   `CONTACT_RECIPIENT_NAME` when contact messages use a different mailbox.

## Netlify requirements

Netlify does not execute the PHP files in `api/`. Before deploying the frontend,
route `/api/career-application.php` and `/api/contact.php` to a separately
secured PHP origin through a same-origin reverse proxy, or migrate the handlers
to equivalent Netlify Functions without weakening any control. The frontend
intentionally rejects HTML or non-success JSON responses and does not fall back
to Netlify Forms.

Remove the legacy `career-application` form from the Netlify Forms dashboard,
including stored submissions and file-upload notifications according to the
approved retention policy. Configure edge rate limits for both POST endpoints.

## OpenResty/Nginx requirements

The `.htaccess` files apply only to Apache. The production OpenResty/Nginx
server must provide equivalent rules:

```nginx
client_max_body_size 11m;
autoindex off;

location ~ ^/api/(?:mail-config(?:\.example)?\.php|PHPMailer(?:/|\.zip))$ {
    deny all;
    return 404;
}

location ~* ^/api/.*\.(?:zip|log|json)$ {
    deny all;
    return 404;
}
```

Apply the response headers from `public/_headers` at the Nginx `server` level.
Restrict direct origin traffic before enabling `trust_cloudflare_ip_header`;
otherwise clients can spoof the address used by the application rate limiter.

Use an edge WAF rate limit for `POST /api/career-application.php` in addition
to the PHP limiter. Apply the same protection to `POST /api/contact.php`.
Alert on repeated 429 responses, failed Turnstile checks, malware detections,
scanner outages, and SMTP failures.
