import { afterAll, afterEach, beforeAll } from "vitest";
import { mockServer } from "./mock-server";

export const setupTestingServer = () => {
    beforeAll(() => mockServer.listen());
    afterEach(() => mockServer.resetHandlers());
    afterAll(() => mockServer.close());
};
