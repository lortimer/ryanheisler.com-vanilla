import { setupServer } from "msw/node";

/**
 * This is used as the mock server for automated tests
 */
export const mockServer = setupServer();

/**
 * `fetch` in NodeJS requires an absolute URL. When API calls are made during tests, they use
 * Node's fetch, so must have an absolute URL. I'm using this URL as the base by prepending it
 * to any call to fetch, and making MSW prepend it to any setup.
 */
export const BASE_URL = "https://localhost:3000";
