import { expect, test } from "@playwright/test";

test.describe("heisldice page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("heisldice");
    });
    test("has a main heading", async ({ page }) => {
        const banner = page.getByRole("banner");
        const heading = banner.getByRole("heading", { level: 1, name: "Heisldice!" });

        await expect(heading).toBeVisible();
    });
    test("shows a list of default dice", async ({ page }) => {
        const list = page.getByRole("list");
        await expect(list).toBeVisible();

        const dice = list.getByRole("listitem");
        await expect(dice).toHaveCount(5);

        await expect(dice).toHaveText(["1", "2", "3", "4", "5"]);
    });
    test("shows an empty game log", async ({ page }) => {
        const gameLog = page.getByRole("status");
        const heading = gameLog.getByRole("heading", { level: 2, name: "Game Log" });
        await expect(heading).toBeVisible();

        const logSection = gameLog.getByTestId("log-entries");

        let entries = logSection.getByText(/.+/);
        await expect(entries).toHaveCount(0);
    });
});