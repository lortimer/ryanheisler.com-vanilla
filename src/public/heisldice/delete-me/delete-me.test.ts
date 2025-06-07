import { describe, expect, it } from "vitest";
import { render } from "../../../../test/render";
import { within } from "@testing-library/dom";
import { heisldiceRoutes } from "../../../heisldice/heisldice-router";
import { http, HttpResponse } from "msw";
import { mockServer } from "../../../../test/mock-server/mock-server";

describe("delete me!", () => {
    it("shows a list of dice", async () => {
        const { getByRole } = await render("delete-me.html");

        const list = getByRole("list");
        expect(list).toBeVisible();

        const dice = within(list).getAllByRole("listitem");
        expect(dice.length).toBe(5);

        expect(dice[0].textContent).toBe("1");
        expect(dice[1].textContent).toBe("2");
        expect(dice[2].textContent).toBe("3");
        expect(dice[3].textContent).toBe("4");
        expect(dice[4].textContent).toBe("5");
    });

    it("has a button to roll the dice", async () => {
        const rolledDice = [4, 4, 3, 1, 2];

        mockServer.use(http.get(`*${heisldiceRoutes.dice}`, () => {
            return HttpResponse.json({ dice: rolledDice });
        }));

        const { getByRole, user } = await render("delete-me.html");

        const button = getByRole("button", { name: /roll dice/i });

        await user.click(button);

        // check loading status
        // resolve promise from MSW

        const dice = within(getByRole("list")).getAllByRole("listitem");

        expect(dice[0].textContent).toBe(`${rolledDice[0]}`);
        expect(dice[1].textContent).toBe(`${rolledDice[1]}`);
        expect(dice[2].textContent).toBe(`${rolledDice[2]}`);
        expect(dice[3].textContent).toBe(`${rolledDice[3]}`);
        expect(dice[4].textContent).toBe(`${rolledDice[4]}`);
    });
});
