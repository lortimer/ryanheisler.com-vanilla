import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.get('/', (request: Request, response: Response) => {
    response.send('Ryan\'s Server');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
