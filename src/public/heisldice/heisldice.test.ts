import { beforeEach, describe, expect, it } from "vitest";
import { Container, render } from "../../../test/render";
import { within } from "@testing-library/dom";

describe("heisldice page", () => {
    let screen: Container;
    beforeEach(async () => {
        screen = await render("heisldice.html");
    });
    it("has a main heading", async () => {
        const banner = screen.getByRole("banner");
        const heading = within(banner).getByRole("heading", { level: 1, name: "Heisldice!" });

        expect(heading).toBeVisible();
    });
    it("shows a list of default dice", async () => {
        const list = screen.getByRole("list");
        expect(list).toBeVisible();

        const dice = within(list).getAllByRole("listitem");
        expect(dice.length).toBe(5);

        expect(dice[0].textContent).toBe("1");
        expect(dice[1].textContent).toBe("2");
        expect(dice[2].textContent).toBe("3");
        expect(dice[3].textContent).toBe("4");
        expect(dice[4].textContent).toBe("5");
    });
    it("shows an empty game log", async () => {
        const gameLog = screen.getByRole("status");
        const heading = within(gameLog).getByRole("heading", { level: 2, name: "Game Log" });
        expect(heading).toBeVisible();

        const logSection = within(gameLog).getByTestId("log-entries");

        let entries = within(logSection).queryAllByText(/.+/);
        expect(entries.length).toBe(0);
    });
});