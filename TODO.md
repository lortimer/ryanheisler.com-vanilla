# To do

## Server

- [ ] Set server port from env var and create different ones per env - test, dev, and prod
- [ ] Set response header policies so https://developer.mozilla.org/en-US/observatory/analyze?host=blog.ryanheisler.com
  passes. Policies / headers should cover:
    - Content Security Policy - CSP
    - Strict Transport Security - HSTS
    - Referrer policy
    - X-Content-Type-Options
    - X-Frame-Options
    - X-XSS-Protection