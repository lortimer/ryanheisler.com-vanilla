# To do

## Blog

- [ ] Add link back to the home page

- [ ] Add skip-nav link
- [X] Short post about difficulty getting NodeJS fetch in HTML scripts in tests
- [ ] Serve blog from Express server, not Parcel static

## Server

- [ ] Set server port from env var and create different ones per env - test, dev, and prod
- [ ] Run tests against built code, not typescript
    - [ ] Create "test" target for Parcel with its own output directory
    - [ ] Build test target before tests
    - [ ] Run tests from built code
    - [ ] Add Typescript syntax back to dice.ts file

## When moving from Cloudfront to Node Server hosted somewhere

- [ ] Set response header policies so https://developer.mozilla.org/en-US/observatory/analyze?host=blog.ryanheisler.com
  passes. Policies / headers should cover:
    - Content Security Policy - CSP
    - Strict Transport Security - HSTS
    - Referrer policy
    - X-Content-Type-Options
    - X-Frame-Options
    - X-XSS-Protection
