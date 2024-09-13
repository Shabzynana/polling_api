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

const getPolls = asyncHandler(async (req: Request, res: Response) => {
    const polls = await authService.getPolls();
    sendJsonResponse(res, 200, "Successfully retrieved polls", polls)

});

const getPollById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const {data, message} = await authService.getPollById(id);
    sendJsonResponse(res, 200, message, data)

});    

export { createPoll, getPolls,getPollById }