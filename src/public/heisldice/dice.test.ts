import test, { expect, Locator } from "@playwright/test";
import { getGeneratorFromArray } from "../../../test/generator";
import { heisldiceRoutes } from "../../heisldice/heisldice-router";

test.describe("dice", () => {
    let rollButton: Locator;
    test.beforeEach(async ({ page }) => {
        await page.goto("heisldice");
    });
    test.describe("when the dice are rolled", () => {
        let diceRolls: number[][];
        test.beforeEach(async ({ page }) => {
            diceRolls = [
                [4, 4, 3, 1, 2],
                [6, 1, 6, 2, 5]
            ];

            const responses = getGeneratorFromArray(diceRolls);

            await page.route(`*/**${heisldiceRoutes.dice}`, async route => {
                const json = { dice: responses.next().value };
                await route.fulfill({ json });
            });

            rollButton = page.getByRole("button", { name: /roll dice/i });
        });
        test("updates the list of dice", async ({ page }) => {
            await rollButton.click();
            const dice = page.getByRole("list").getByRole("listitem");

            await expect(dice).toHaveText(diceRolls[0].map(x => `${x}`));
        });
        test("adds rolled dice to the game log IN REVERSE ORDER", async ({ page }) => {
            const gameLog = page.getByRole("status");
            const logSection = gameLog.getByTestId("log-entries");

            await rollButton.click();
            let entries = logSection.getByText(/.+/);
            await expect(entries).toHaveCount(1);

            await rollButton.click();
            entries = logSection.getByText(/.+/);
            await expect(entries).toHaveCount(2);

            const logs = await entries.all();

            const firstRoll = diceRolls[0];
            const secondRoll = diceRolls[1];

            await expect(logs[0]).toHaveText(`You rolled ${secondRoll[0]}, ${secondRoll[1]}, ${secondRoll[2]}, ${secondRoll[3]}, ${secondRoll[4]}`);
            await expect(logs[1]).toHaveText(`You rolled ${firstRoll[0]}, ${firstRoll[1]}, ${firstRoll[2]}, ${firstRoll[3]}, ${firstRoll[4]}`);
        });
    });

    test.describe("while the dice are rolling", () => {
        let resolve: () => void;
        test.beforeEach(async ({ page }) => {
            await page.route(`*/**${heisldiceRoutes.dice}`, async route => {
                await new Promise<void>(resolve_ => {resolve = resolve_;});
                const response = await route.fetch();
                const json = await response.json();
                await route.fulfill({ response, json });
            });

            rollButton = page.getByRole("button", { name: /roll dice/i });
            await rollButton.click();
        });
        test("dice elements are inaccessible to assistive technology", async ({ page }) => {
            let dice = page.getByRole("list");
            await expect(dice).not.toBeVisible();

            resolve();

            dice = page.getByRole("list");
            await expect(dice).toBeVisible();
        });
        test("dice elements change value rapidly", () => {
            // test that dice values get set to the output of a random number generator
            /**
             * I want to move the randomInteger function into a utility, import it in dice.ts, and then mock it from
             * this test, but I have to look into how to import something into a script loaded by a script tag. I think
             * there's an attribute of a script tag you can set to make this possible.
             *
             * I could also load the random script with a script tag and declare the function with var, and then assume
             * it exists in this file, but I also don't know how well that will work.
             */

        });
    });
});
