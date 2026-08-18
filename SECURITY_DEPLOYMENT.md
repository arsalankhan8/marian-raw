# Careers API security deployment

The Careers API fails closed until its server-side controls are configured.

## Required runtime configuration

1. Prefer providing an equivalent configuration file from the deployment
   secret store and setting `CAREER_MAIL_CONFIG_PATH` to its absolute path
   outside the document root. If the local `api/mail-config.php` fallback is
   used, keep it outside source control and apply the API access rule below.
2. Set the SMTP and Turnstile secrets on the server. Set the Turnstile action
   to `career_application`. Never expose the Turnstile secret through a
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
to the PHP limiter. Alert on repeated 429 responses, failed Turnstile checks,
malware detections, scanner outages, and SMTP failures.
