import { Request, Response, NextFunction } from "express";
import { PollService } from "../services/poll.service";
import { asyncHandler, sendJsonResponse } from "../helpers";

const authService = new PollService();

const createPoll = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user.user_id;
    const { title } = req.body;

    const payload = { title, userId };
    const { poll, message} = await authService.createPoll(payload);
    sendJsonResponse(res, 201, message, poll)

});

export { createPoll }