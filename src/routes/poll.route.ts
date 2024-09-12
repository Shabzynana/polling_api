import { Router } from "express";
import { validateData, authMiddleware } from "../middleware";
import { createPoll, getPollById } from "../controllers";
// import { pollSchema } from "../schemas/pollSchema";

const pollRoute = Router();

pollRoute.post(
    "/poll",
    // validateData(pollSchema),
    authMiddleware,
    createPoll
);

pollRoute.get(
    "/poll",
    authMiddleware,
    getPollById

);

export { pollRoute };


