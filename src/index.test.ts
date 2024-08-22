import * as fs from "node:fs";
import path from "path";
import { beforeEach, describe, it } from "vitest";
import { JSDOM } from "jsdom";
import { within } from "@testing-library/dom";

import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

const html = fs.readFileSync(path.resolve(__dirname, "index.html"));

describe("index", () => {
    let dom: JSDOM;
    let container: HTMLElement;
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: "dangerously" });
        container = dom.window.document.body;
    });

    it("renders a heading", () => {
        let heading = within(container).getByRole("heading", { level: 1, name: "Welcome" });
        expect(heading).toBeVisible();
    });
});
