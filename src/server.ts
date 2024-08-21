import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.get('/', (request: Request, response: Response) => {
    response.sendFile(`${__dirname}/index.html`);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
