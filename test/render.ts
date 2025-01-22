import { JSDOM } from "jsdom";
import * as fs from "node:fs";
import { BoundFunctions, queries, within as testingLibraryContainer } from "@testing-library/dom";

const path = require("path");

export type Container = BoundFunctions<typeof queries>;

export const render = (fileName: string) => {
    const callingFilePath = getCallerFilePath();

    const html = fs.readFileSync(path.resolve(callingFilePath, fileName));

    return new Promise<Container>(resolve => {
        const dom = new JSDOM(html, {
            runScripts: "dangerously",
            resources: "usable",
            url: `file://${callingFilePath}/${fileName}`
        });
        dom.window.document.addEventListener("DOMContentLoaded", () => {
            resolve(testingLibraryContainer(dom.window.document.body));
        });
    });
};

function getCallerFilePath() {
    let stack = new Error().stack?.split("\n");
    if (!stack) {
        throw new Error("Could not get calling file path");
    }
    return stack[3].slice(
        stack[3].indexOf("/"),
        stack[3].lastIndexOf("/")
    );
}
