import { Request, Response } from "express";
import { randomInteger } from "../public/heisldice/random";

export const rollDice = (_: Request, response: Response) => {
    response.setHeader("Content-Type", "application/json");

    response.json({ dice: Array.from({ length: 5 }, () => randomInteger(1, 6)) });
};
