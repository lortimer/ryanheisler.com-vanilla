import { describe, it, expect } from "vitest";
import { render } from "../../test/render";

describe("index", () => {
    it("renders a heading", async () => {
        const { getByRole } = await render("index.html");
        const heading = getByRole("heading", { level: 1, name: "Ryan Heisler's Blog" });
        expect(heading).toBeVisible();
    });

    it("has a link to the blog post", async () => {
        const name = "Accessibility Testing is Essential for Creating a Good User Experience";

        const { getByRole } = await render("index.html");

        const link: HTMLLinkElement = getByRole("link", { name });
        expect(link).toBeVisible();
        expect(link.href).toContain("blog/accessibility-testing-essential.html");
    });

    it("has a link to a credits and license page", async () => {
        const name = "technologies and assets made by other people";

        const { getByRole } = await render("index.html");

        const link: HTMLLinkElement = getByRole("link", { name });
        expect(link).toBeVisible();
        expect(link.href).toContain("credits-and-licenses.html");
    });
});
