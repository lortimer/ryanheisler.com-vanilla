# Website Infrastructure

## Image Hosting

Images for this site are hosted on AWS S3. To access, log into AWS as a root user (ryan.a.heisler@gmail.com).

The S3 bucket is called ryan-heisler-blog and it lives in the US East 2 - Ohio region. It's a private bucket, and the
files are publicly served by Cloudfront

## Static File Distribution

The AWS Cloudfront Distribution ID is E35KDQMT1OOMLL and its root URL is https://dmqf4ocirlt5h.cloudfront.net

## Stuff I had to do to host on Cloudfront with custom domain

1. Create public S3 bucket and Cloudfront distribution pointing at it - there are lots of tutorials out there
    1. When creating the distribution, try to set "Redirect HTTP to HTTPS", if that's not an option, it can be done
       later.
2. In Porkbun (DNS Host), add a CNAME record to the DNS from blog.ryanheisler.com to the cloudfront URL
   dmqf4ocirlt5h.cloudfront.net
3. I originally got a TLS certificate from Porkbun, but that meant I had to manually update it every 90 days or so. I
   switched to getting a certificate from AWS directly, which required adding a CNAME record to my domain in Porkbun.
   Now it auto-renews. Instructions for uploading a certificate to Amazon are in the git history of this document.
    1. MAKE SURE ANY CERTIFICATE ISSUED IS IN THE US-EAST-1 REGION, Cloudfront can only use certificates there.

At this point, the redirect from Porkbun to the distribution worked, but TLS was not forced.

1. Open the Distribution and go to the Behaviors tab
2. Select the default behavior and click Edit
3. Under "Viewer", select "Redirect HTTP to HTTPS"
4. Click "Save changes" at the bottom

### Security Headers

Cloudfront lets you set headers, which was a convenient way to set all the security headers I need to make my site
resistant to things like cross-site scripting, clickjacking, etc.

[Mozilla has a site that will scan your site](https://developer.mozilla.org/en-US/observatory/analyze?host=blog.ryanheisler.com)
and give you a score around these headers.

I edited the Behavior for my cloudfront distribution to use a response header policy I created using guidelines from
Mozilla's site.
