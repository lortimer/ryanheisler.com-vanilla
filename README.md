# ryanheisler.com

Clone this repository and run `npm install`

To run the full app in development mode, run `npm run api-watch`, `npm run api-dev`, and `npm run frontend-dev` in
separate terminals.

To build and run the full app in production mode, run `npm run build` followed by `npm start`.

To run tests, run `npm test`

## Update site content - 1st Draft

Currently, I'm hosting this site on AWS S3 with Cloudfront. I don't need a server right now because everything is pre-rendered and needs no JavaScript. Eventually, I may move to server hosting, especially if I want to do any kind of backend rendering.

The following is how you can update the site with new content.

1. Run `npm run build`
2. Upload the contents of dist/public to the S3 bucket, overwriting or skipping anything that's already there.
3. Create an invalidation for the Cloudfront distribution. In Cloudfront:
    1. Open the Distribution
    2. Go to the Invalidations tab
    3. Click "Create invalidation"
    4. Put "/*" to invalidate all files, or invalidate individual files more selectively if you want.
4. When the invalidation is done processing, go to blog.ryanheisler.com and double-check your new content is present.
