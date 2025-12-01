# To do

## Blog

- [ ] post adept article to reddit - own post and linked on threads about scroll not working on MacOS
- [ ] Add "opens in new tab" and target=blank to all external links
- [ ] Add page for each "tag" (accessibility, vanilla project, etc.)
    - [ ] Add links somewhere on main page
- [ ] Add skip-nav link
- [ ] Add an ID to all headings
- [ ] Add a copy-link icon button to all headings that changes the URL to contain the hash link to the heading and
  copies it to the clipboard
- [ ] Make posts on main page show up as image cards
- [ ] Figure out auto-renewal of certificate
- [ ] Serve blog from Express server, not Parcel static
- [ ] Add an RSS feed

## Server

- [ ] Set server port from env var and create different ones per env - test, dev, and prod

## When moving from Cloudfront to Node Server hosted somewhere

- [ ] Set response header policies so https://developer.mozilla.org/en-US/observatory/analyze?host=blog.ryanheisler.com
  passes. Policies / headers should cover:
    - Content Security Policy - CSP
    - Strict Transport Security - HSTS
    - Referrer policy
    - X-Content-Type-Options
    - X-Frame-Options
    - X-XSS-Protection