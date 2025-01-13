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
3. To avoid moving DNS hosting to AWS, add an alternate domain and certificate to AWS Cloudfront proving I own
   blog.ryanheisler.com
    1. In Porkbun, go to the details of the domain and download the SSL bundle for the domain
    2. In AWS Certificate Manager (ACM), Make sure you're in US-east 1, Cloudfront can only use certificates in that
       region.
    3. Click "import a cetificate"
    4. On the following screen:
        1. paste the FIRST CERTIFICATE BLOCK from the `domain.cert.pem` file into "Certificate body"
        2. paste the contents of `private.key.pem` into "Certificate private key"
        3. [Taken from Stackoverflow](https://stackoverflow.com/a/72553797)
        4. Finally, paste the FULL CONTENTS of `domain.cert.pem` into "Certificate chain". If you don't it will think
           the certificate was not issued by a trusted issuer, even though the ISRG/Let's Encrypt is trusted
    5. In AWS Cloudfront:
        1. Open the distribution
        2. Click "Edit"
        3. Under "Alternate domain name (CNAME)", click "Add item"
            1. type "blog.ryanheisler.com"
        4. Under "Custom SSL certificate", open the dropdown and select the certificate from the list

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
