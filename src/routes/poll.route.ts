import { Router } from "express";
import { validateData, authMiddleware } from "../middleware";
import { createPoll } from "../controllers";
// import { pollSchema } from "../schemas/pollSchema";

const pollRoute = Router();

pollRoute.post(
    "/poll",
    // validateData(pollSchema),
    authMiddleware,
    createPoll
);

export { pollRoute };


