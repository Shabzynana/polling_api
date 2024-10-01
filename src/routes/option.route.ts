import { Router } from "express";
import { validateData, authMiddleware, checkPermission } from "../middleware";
import { createOptionsForPoll, getOptionsForPoll } from "../controllers";
import { UserType } from "../models";
import { optionSchema } from "../schemas/optionSchema";

const optionRoute = Router();

optionRoute.post(
    "/poll/:pollId/option",
    validateData(optionSchema),
    authMiddleware,
    checkPermission(UserType.ADMIN),
    createOptionsForPoll
);

optionRoute.get(
    "/poll/:pollId/options",
    authMiddleware,
    getOptionsForPoll
);

export { optionRoute }