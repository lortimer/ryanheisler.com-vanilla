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
        dom = new JSDOM(html, { runScripts: "dangerously" });
        container = dom.window.document.body;
    });

    it("renders a heading", () => {
        const heading = within(container).getByRole("heading", { level: 1, name: "Welcome" });
        expect(heading).toBeVisible();
    });

    it("shows more text when button is clicked", () => {
        /**
         * requires @testing-library/user-event, adding a script to the HTML. If this works, move the script out of the
         * HTML, then put it into Typescript. See if you can use a different TS config file for scripts to be delivered
         * to the browser.
         */

        const user = userEvent.setup();
        const button = within(container).getByRole("button");
    });
});
