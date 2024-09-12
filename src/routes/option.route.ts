import { Router } from "express";
import { validateData, authMiddleware } from "../middleware";
import { createOptionsForPoll } from "../controllers";
// import { pollSchema } from "../schemas/pollSchema";


const optionRoute = Router();

optionRoute.post(
    "/poll/:pollId/option",
    // validateData(pollSchema),
    authMiddleware,
    createOptionsForPoll
);

export { optionRoute }