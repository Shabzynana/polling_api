import { Router } from "express";
import { validateData, authMiddleware } from "../middleware";
import { createPoll, getPolls, getPollById } from "../controllers";
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
    getPolls
);

pollRoute.get(
    "/poll/:id",
    authMiddleware,
    getPollById

);

export { pollRoute };


