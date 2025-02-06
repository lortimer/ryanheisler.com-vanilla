import "@testing-library/jest-dom/vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";
import { setupTestingServer } from "./test/mock-server/setup-testing-server";

// required to be able to call Jest matchers like `toBeVisible`
expect.extend(matchers);

setupTestingServer();
