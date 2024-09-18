import { Router } from "express";
import { authMiddleware } from "../middleware";
import { createVote } from "../controllers";

const voteRoute = Router();

voteRoute.post(
    "/vote",
    authMiddleware,
    createVote
);

export { voteRoute}