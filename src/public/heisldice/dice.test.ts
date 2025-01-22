import { describe, expect, it } from "vitest";
import { render } from "../../../test/render";
import { within } from "@testing-library/dom";

describe("dice", () => {
    it("shows a list of dice", async () => {
        const { getByRole } = await render("heisldice.html");

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
});
