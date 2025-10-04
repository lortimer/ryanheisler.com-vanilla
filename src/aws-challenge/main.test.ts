import { describe, expect, it } from "vitest";
import { findValidCredentials } from "./main";

describe("aws challenge", () => {
    const testCases = [
        { primary: "a", backup: "b", expected: 0 },
        { primary: "b", backup: "a", expected: 1 },
        { primary: "aba", backup: "ab", expected: 3 },
        { primary: "aba", backup: "abca", expected: 2 },
        { primary: "abc", backup: "ab", expected: 5 },
        { primary: "abcd", backup: "abc", expected: 12 },
        { primary: "abcde", backup: "abcd", expected: 27 },
        { primary: "abade", backup: "abcd", expected: 20 },
        { primary: "abc", backup: "abc", expected: 4 },
        { primary: "bbbbb", backup: "a", expected: 31 },
        { primary: "bbbbbb", backup: "a", expected: 63 },
        { primary: "bbbbbbbbbbbbbbbbbbbb", backup: "a", expected: 1048575, name: "bx20 : a" },
    ];
    testCases.forEach(tc => {
        it(`${tc.name || `${tc.primary} : ${tc.backup}`} - returns count of greater subsequences`, async () => {
            const result = findValidCredentials(tc.primary, tc.backup);
            expect(result.numberOfSubstrings).toEqual(tc.expected);
        });
    });
});

it("debug version", () => {
    const result = findValidCredentials("abc", "ab");
    expect(result.modulo).toEqual(5);
});

/**
 * abade vs. abcd
 * a        0
 * b        1
 * a        0
 * d        1
 * e        1
 * ab       0
 * aa       0
 * ad       1
 * ae       1
 * ba       1
 * bd       1
 * be       1
 * ad       1
 * ae       1
 * de       1
 * aba      0
 * abd      1
 * abe      1
 * aad      0
 * aae      0
 * ade      1
 * bad      1
 * bae      1
 * bde      1
 * ade      1
 * abad     0
 * abae     0
 * abde     1
 * aade     0
 * bade     1
 * abade    0
 */