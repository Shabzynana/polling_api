import {Request, Response, NextFunction} from "express";
import { VoteService } from "../services/vote.service";
import { asyncHandler, sendJsonResponse } from "../helpers";

const voteService = new VoteService();


const createVote = asyncHandler(async (req: Request, res: Response) => {

    const id = req.user.user_id
    const data = { userId: id, ...req.body };
    const { vote, message} = await voteService.createVote(data);
    // const { pollId, optionId} = req.body;
    // const { vote, message} = await voteService.createVote({user_id, pollId, optionId});
    sendJsonResponse(res, 201, message, vote)

});

export { createVote }