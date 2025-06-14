import test, { expect } from "@playwright/test";

test.describe("index", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });
    test("renders a heading", async ({ page }) => {
        const heading = page.getByRole("heading", { level: 1, name: "Ryan Heisler's Blog" });
        await expect(heading).toBeVisible();
    });

    test("has a link to the blog post", async ({ page }) => {
        const name = "Accessibility Testing is Essential for Creating a Good User Experience";

        const link = page.getByRole("link", { name });
        await expect(link).toBeVisible();
        await expect(link.first()).toHaveAttribute("href", "/blog/accessibility/accessibility-testing-essential.html");
    });

    test("has a link to a credits and license page", async ({ page }) => {
        const name = "technologies and assets made by other people";

        const link = page.getByRole("link", { name });
        await expect(link).toBeVisible();
        await expect(link.first()).toHaveAttribute("href", "/credits-and-licenses.html");
    });
});
