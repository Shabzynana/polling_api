import { Router } from "express";
import { authMiddleware } from "../middleware";
import { createVote, getPollresults } from "../controllers";

const voteRoute = Router();

voteRoute.post(
    "/poll/:id/vote",
    authMiddleware,
    createVote
);


voteRoute.get(
    "/poll/:id/results",
    authMiddleware,
    getPollresults
);

export { voteRoute}