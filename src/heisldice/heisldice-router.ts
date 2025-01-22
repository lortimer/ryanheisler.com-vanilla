import { Router } from "express";
import { rollDice } from "./dice.api";

export const heisldiceRouter = Router();

heisldiceRouter.get("/dice", rollDice);
