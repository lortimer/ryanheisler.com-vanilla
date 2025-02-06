import { JSDOM } from "jsdom";
import * as fs from "node:fs";
import { BoundFunctions, queries, within as testingLibraryContainer } from "@testing-library/dom";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";
import { BASE_URL } from "./mock-server/mock-server";
import path from "path";

export type Container = BoundFunctions<typeof queries> & { user: UserEvent };

export const render = (fileName: string) => {
    const callingFilePath = getCallerFilePath();

    const html = fs.readFileSync(path.resolve(callingFilePath, fileName));

    return new Promise<Container>(resolve => {
        const dom = new JSDOM(html, {
            runScripts: "dangerously",
            resources: "usable",
            url: `file://${callingFilePath}/${fileName}`,
        });

        const user = userEvent.setup();

        dom.window.document.addEventListener("DOMContentLoaded", () => {
            dom.window.fetch = (url, ...args) => {
                url = `${BASE_URL}${url}`;
                return fetch(url, ...args);
            };

            const container = {
                ...testingLibraryContainer(dom.window.document.body),
                user
            };

            resolve(container);
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
