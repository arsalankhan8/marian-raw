# Forms deployment

The `contact` and `career-application` forms use Netlify Forms. Their static
definitions live in `public/__forms.html`; no SMTP or Turnstile environment
variables are required by the frontend.

## Netlify requirements

1. In the Netlify project, open **Forms** and enable form detection.
2. Deploy the site after enabling detection. Confirm that both `contact` and
   `career-application` appear under active forms.
3. Configure submission email notifications for the appropriate Netlify team
   members.
4. Restrict access to career submissions because resumes contain personal
   information. Define and enforce an approved retention/deletion period.
5. Monitor spam submissions and form usage. The forms include Netlify honeypot
   fields, and the career form limits resumes to PDF or DOCX files under 7 MB.

## Legacy PHP API

The handlers under `api/` are retained as an unused alternative implementation.
Netlify does not execute PHP. If those handlers are re-enabled behind a secured
PHP origin, apply all controls below and restore the required SMTP, Turnstile,
malware-scanning, origin, and rate-limit configuration.

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
