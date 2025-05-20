import {Request, Response, NextFunction} from "express";
import { VoteService } from "../services/vote.service";
import { asyncHandler, sendJsonResponse } from "../helpers";

export const voteService = new VoteService();


const createVote = asyncHandler(async (req: Request, res: Response) => {

    const id = req.user.user_id
    const pollId = req.params.id
    const data = { userId: id, pollId: pollId, ...req.body };
    // const { vote, message} = await voteService.createVote(data);
    const {message} = await voteService.createVote(data);

    sendJsonResponse(res, 201, message)

});

const getPollresults = asyncHandler(async (req: Request, res: Response) => {

    const pollId = req.params.id;
    const { data, message } = await voteService.getPollresults(pollId)
    sendJsonResponse(res, 200, message, data)

})

export { createVote, getPollresults }