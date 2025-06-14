import express, { Express, Request, Response } from "express";
import path from "path";
import { heisldiceRouter, heisldiceRoutes } from "./heisldice/heisldice-router";

export const app: Express = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_: Request, response: Response) => {
    response.sendFile(`${path.join(__dirname, "public", "index.html")}`);
});

heisldiceRouter.get(heisldiceRoutes.index, (_: Request, response: Response) => {
    response.sendFile(`${path.join(__dirname, "public", "heisldice", "heisldice.html")}`);
});

app.use(heisldiceRouter);

// TODO only register this in non-prod environments
app.get("/playwright", (_: Request, response: Response) => {
    /**
     * Playwright was running some tests before the server was ready, so this
     * setTimeout is a hack to get it to wait until the server is fully ready
     * before running any tests
     */
    setTimeout(() => response.status(200).end(), 2000);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
