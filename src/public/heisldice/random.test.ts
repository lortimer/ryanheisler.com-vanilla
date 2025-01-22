import { afterEach, describe, expect, it, vi } from "vitest";
import { randomInteger } from "./random";

describe("random number utility", () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should generate random integer in a range", () => {
        const results: number[] = Array(100);
        for (let i = 0; i < results.length; i++) {
            const result = randomInteger(1, 10);
            expect(result).toBeLessThanOrEqual(10);
            expect(result).toBeGreaterThanOrEqual(1);
            results[i] = result;
        }

        expect(results).toContain(1);
        expect(results).toContain(2);
        expect(results).toContain(3);
        expect(results).toContain(4);
        expect(results).toContain(5);
        expect(results).toContain(6);
        expect(results).toContain(7);
        expect(results).toContain(8);
        expect(results).toContain(9);
        expect(results).toContain(10);
    });
});
