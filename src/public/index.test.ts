import * as fs from "node:fs";
import path from "path";
import { beforeEach, describe, it, expect } from "vitest";
import { JSDOM } from "jsdom";
import { within } from "@testing-library/dom";

const html = fs.readFileSync(path.resolve(__dirname, "index.html"));

describe("index", () => {
    let dom: JSDOM;
    let container: HTMLElement;

    beforeEach(async () => {
        await new Promise<void>(resolve => {
            dom = new JSDOM(html, {
                runScripts: "dangerously",
                resources: "usable",
                url: `file://${__dirname}/index.html`
            });
            dom.window.document.addEventListener("DOMContentLoaded", () => {
                container = dom.window.document.body;
                resolve();
            });
        });
    });

    it("renders a heading", () => {
        const heading = within(container).getByRole("heading", { level: 1, name: "Ryan Heisler's Blog" });
        expect(heading).toBeVisible();
    });

    it("has a link to the blog post", async () => {
        const name = "Accessibility Testing is Essential for Creating a Good User Experience";
        const link: HTMLLinkElement = within(container).getByRole("link", { name });
        expect(link).toBeVisible();
        expect(link.href).toContain("blog/accessibility-testing-essential.html");
    });

    it("has a link to a credits and license page", async () => {
        const name = "technologies and assets made by other people";
        const link: HTMLLinkElement = within(container).getByRole("link", { name });
        expect(link).toBeVisible();
        expect(link.href).toContain("credits-and-licenses.html");
    });
});
