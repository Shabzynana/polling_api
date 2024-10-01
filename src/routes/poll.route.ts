import { Router } from "express";
import { validateData, authMiddleware, checkPermission } from "../middleware";
import { createPoll, getPolls, getPollById } from "../controllers";
import { UserType } from "../models";
import { pollSchema } from "../schemas/pollSchema";

const pollRoute = Router();

pollRoute.post(
    "/poll",
    validateData(pollSchema),
    authMiddleware,
    checkPermission(UserType.ADMIN),
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


