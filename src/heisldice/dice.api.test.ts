import { describe, expect, it, vi } from "vitest";
import supertest from "supertest";
import { app } from "../server";
import { randomInteger } from "./random";

vi.mock("./random", () => ({
    randomInteger: vi.fn().mockName("randomInteger")
}));

describe("dice API", () => {
    it("should roll 5 random dice", async () => {
        let nextValue = 5;
        vi.mocked(randomInteger).mockImplementation((from, through) => {
            if (from === 1 && through === 6) {
                return nextValue--;
            }
            return -1;
        });

        const response = await supertest(app).get("/dice")
            .expect("Content-Type", /json/)
            .expect(200);

        expect(response.body.dice).toEqual([5, 4, 3, 2, 1]);
    });
});
