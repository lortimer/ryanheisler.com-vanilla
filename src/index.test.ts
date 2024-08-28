import * as fs from "node:fs";
import path from "path";
import { beforeEach, describe, it } from "vitest";
import { JSDOM } from "jsdom";
import { within } from "@testing-library/dom";

import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

const html = fs.readFileSync(path.resolve(__dirname, "index.html"));

describe("index", () => {
    let dom: JSDOM;
    let container: HTMLElement;
    beforeEach(() => {
        dom = new JSDOM(html, {
            runScripts: "dangerously",
            resources: "usable",
            url: `file://${__dirname}/index.html`
        });
        container = dom.window.document.body;
    });

    it("renders a heading", () => {
        const heading = within(container).getByRole("heading", { level: 1, name: "Welcome" });
        expect(heading).toBeVisible();
    });

    it("shows more text when button is clicked", async () => {
        const user = userEvent.setup();
        const button = within(container).getByRole("button");
        await user.click(button);
        expect(within(container).getByText("added by javascript")).toBeVisible();
    });
});
