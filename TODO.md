# To do

- [ ] Add link back to the home page
- [ ] Add skip-nav link

## When moving from Cloudfront to Node Server hosted somewhere

- [ ] Set response header policies so https://developer.mozilla.org/en-US/observatory/analyze?host=blog.ryanheisler.com
  passes. Policies / headers should cover:
    - Content Security Policy - CSP
    - Strict Transport Security - HSTS
    - Referrer policy
    - X-Content-Type-Options
    - X-Frame-Options
    - X-XSS-Protection
