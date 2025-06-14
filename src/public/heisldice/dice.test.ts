import { beforeEach, describe, expect, it } from "vitest";
import { Container, render } from "../../../test/render";
import { within } from "@testing-library/dom";
import { heisldiceRoutes } from "../../heisldice/heisldice-router";
import { http, HttpResponse } from "msw";
import { mockServer } from "../../../test/mock-server/mock-server";
import { getGeneratorFromArray } from "../../../test/generator";

describe("dice", () => {
    let screen: Container;
    let rollButton: HTMLButtonElement;
    describe("when the dice are rolled", () => {
        let diceRolls: number[][];
        beforeEach(async () => {
            diceRolls = [
                [4, 4, 3, 1, 2],
                [6, 1, 6, 2, 5]
            ];

            const responses = getGeneratorFromArray(diceRolls);

            mockServer.use(http.get(`*${heisldiceRoutes.dice}`, () => {
                return HttpResponse.json({ dice: responses.next().value });
            }));

            screen = await render("heisldice.html");

            rollButton = screen.getByRole("button", { name: /roll dice/i });
        });
        it("updates the list of dice", async () => {
            await screen.user.click(rollButton);
            const dice = within(await screen.findByRole("list")).getAllByRole("listitem");
            const firstRoll = diceRolls[0];

            expect(dice[0].textContent).toBe(`${firstRoll[0]}`);
            expect(dice[1].textContent).toBe(`${firstRoll[1]}`);
            expect(dice[2].textContent).toBe(`${firstRoll[2]}`);
            expect(dice[3].textContent).toBe(`${firstRoll[3]}`);
            expect(dice[4].textContent).toBe(`${firstRoll[4]}`);
        });
        it("adds rolled dice to the game log IN REVERSE ORDER", async () => {
            const gameLog = screen.getByRole("status");
            const logSection = within(gameLog).getByTestId("log-entries");

            await screen.user.click(rollButton);
            let entries = within(logSection).queryAllByText(/.+/);
            expect(entries.length).toEqual(1);

            await screen.user.click(rollButton);
            entries = within(logSection).queryAllByText(/.+/);
            expect(entries.length).toEqual(2);

            const firstRoll = diceRolls[0];
            const secondRoll = diceRolls[1];

            expect(entries[0].textContent).toEqual(`You rolled ${secondRoll[0]}, ${secondRoll[1]}, ${secondRoll[2]}, ${secondRoll[3]}, ${secondRoll[4]}`);
            expect(entries[1].textContent).toEqual(`You rolled ${firstRoll[0]}, ${firstRoll[1]}, ${firstRoll[2]}, ${firstRoll[3]}, ${firstRoll[4]}`);
        });
    });

    describe("while the dice are rolling", () => {
        let resolve: () => void;
        beforeEach(async () => {
            mockServer.use(http.get(`*${heisldiceRoutes.dice}`, async () => {
                await new Promise<void>(resolve_ => {resolve = resolve_;});
                return HttpResponse.json({ dice: [1, 2, 3, 4, 5] });
            }));

            screen = await render("heisldice.html");

            rollButton = screen.getByRole("button", { name: /roll dice/i });
            await screen.user.click(rollButton);
        });
        it("dice elements are inaccessible to assistive technology", async () => {
            let dice = screen.queryByRole("list");
            expect(dice).not.toBeInTheDocument();

            resolve();

            dice = await screen.findByRole("list");
            expect(dice).toBeInTheDocument();
        });
    });
});
