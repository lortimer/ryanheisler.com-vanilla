import { Router } from "express";
import { rollDice } from "./dice.api";

export const heisldiceRouter = Router();

export const heisldiceRoutes = {
    index: "/",
    dice: "/dice"
};

heisldiceRouter.get(heisldiceRoutes.dice, rollDice);
