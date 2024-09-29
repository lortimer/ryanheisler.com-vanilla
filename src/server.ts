import express, { Express, Request, Response } from "express";
import path from "path";

const app: Express = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (request: Request, response: Response) => {
    response.sendFile(`${path.join(__dirname, "public", "index.html")}`);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
