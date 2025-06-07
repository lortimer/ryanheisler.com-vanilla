import { JSDOM } from "jsdom";
import * as fs from "node:fs";
import { BoundFunctions, queries, within as testingLibraryContainer } from "@testing-library/dom";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";
import { BASE_URL } from "./mock-server/mock-server";
import path from "path";

export type Container = BoundFunctions<typeof queries> & { user: UserEvent };

export const render = (fileName: string) => {
    const { filePath, fileUrl } = getTranspiledFilePathAndUrl(fileName);

    const html = fs.readFileSync(filePath);

    return new Promise<Container>(resolve => {
        const dom = new JSDOM(html, {
            runScripts: "dangerously",
            resources: "usable",
            url: `file://${fileUrl}`,
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

/**
 * Gets the absolute path to an HTML file in the test directory based on the path of the file that called
 * `render`, and the URL for that file for JSDOM to use to load related scripts and other resources
 *
 * @returns the file path and URL of the HTML file
 *
 * @param fileName the name of the HTML file
 */
function getTranspiledFilePathAndUrl(fileName: string) {
    /**
     * An Error's staketrace array contains the paths to all files that lead to this call. This is a
     * widely-used hack we can use to get the absolute path to the test file that called `render`,
     * and from there build up a path to where the HTML file will be in the test directory.
     */
    let stack = new Error().stack?.split("\n");
    if (!stack) {
        throw new Error("Could not get calling file path");
    }

    // stacktrace array's 4th entry is " at <file path>", so we remove the leading " at "
    const absolutePath = stack[3].slice(
        stack[3].indexOf("/"),
        stack[3].lastIndexOf("/")
    );

    /**
     * Test files like the HTML file under test and any scripts and stylesheets it loads are transpiled
     * and copied to the test directory, .test-dist, in the root of this project.
     *
     * To run the tests against them, we need to insert the test directory's path into the file's absolute path
     */
    const filePathStart = absolutePath.substring(0, absolutePath.indexOf("/src"));
    const publicPath = "/src/public";
    const indexOfEnd = absolutePath.indexOf(publicPath) + publicPath.length;
    const filePathEnd = absolutePath.substring(indexOfEnd);

    const testDirectoryPublicPath = `/.test-dist/${publicPath}`;

    /**
     * this is the directory where the HTML file lives in the test directory. JSDOM will use it to load
     * scripts and stylesheets imported by the HTML file.
     */
    const fileUrl = `${filePathStart}${testDirectoryPublicPath}`;

    // this is the path to the HTML file in the test directory, used to read the HTML into a buffer
    const filePath = `${fileUrl}${filePathEnd}`;

    return {
        filePath: path.resolve(filePath, fileName),
        fileUrl: path.resolve(fileUrl, fileName)
    };
}
