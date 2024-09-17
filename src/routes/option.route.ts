import { Router } from "express";
import { validateData, authMiddleware } from "../middleware";
import { createOptionsForPoll, getOptionsForPoll } from "../controllers";
// import { pollSchema } from "../schemas/pollSchema";

const optionRoute = Router();

optionRoute.post(
    "/poll/:pollId/option",
    // validateData(pollSchema),
    authMiddleware,
    createOptionsForPoll
);

optionRoute.get(
    "/poll/:pollId/options",
    authMiddleware,
    getOptionsForPoll
);

export { optionRoute }