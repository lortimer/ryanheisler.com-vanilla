import "@testing-library/jest-dom/vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";

// required to be able to call Jest matchers like `toBeVisible`
expect.extend(matchers);
