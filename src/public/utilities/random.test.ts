import { describe, expect, it } from "vitest";
import { randomInteger } from "./random";

describe("random number utility", () => {
    const happyCases = [
        { from: 1, through: 10 },
        { from: -4, through: 3 },
        { from: -7, through: -2 },
    ];
    happyCases.forEach(testCase => {
        it(`[${testCase.from}, ${testCase.through}] should generate a random integer in range`, () => {
            const results: number[] = [];
            const numberOfIterations = (testCase.through - testCase.from) * 10;
            for (let i = 0; i < numberOfIterations; i++) {
                const result = randomInteger(testCase.from, testCase.through);
                expect(result).toBeGreaterThanOrEqual(testCase.from);
                expect(result).toBeLessThanOrEqual(testCase.through);
                results.push(result);
            }
            for (let i = testCase.from; i < testCase.through + 1; i++) {
                expect(results).toContain(i);
            }

            expect(results).not.toContain(testCase.from - 1);
            expect(results).not.toContain(testCase.through + 1);
        });
    });

    it("should throw if through is less than from", () => {
        const errorMessage = "randomInteger requires first parameter 'from' (57) to be less than second parameter 'through' (43)";
        expect(() => randomInteger(57, 43)).toThrowError(new SyntaxError(errorMessage));
    });

    it("should throw if through is equal to from", () => {
        const errorMessage = "randomInteger requires first parameter 'from' (-3) to be less than second parameter 'through' (-3)";
        expect(() => randomInteger(-3, -3)).toThrowError(new SyntaxError(errorMessage));
    });
});
