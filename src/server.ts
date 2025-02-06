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
    console.log(`${path.join(__dirname, "public", "heisldice", "heisldice.html")}`);
    response.sendFile(`${path.join(__dirname, "public", "heisldice", "heisldice.html")}`);
});

app.use(heisldiceRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
