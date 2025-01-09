import {Request, Response, NextFunction} from "express";
import { VoteService } from "../services/vote.service";
import { asyncHandler, sendJsonResponse } from "../helpers";
import { io } from "../app"
// import { getSocketInstance } from "../middleware/io";

// const io = getSocketInstance();  // Access the singleton Socket.IO instance


console.log('Socket.IO instance receivedd controller:', !!io);  // Check if the io instance is valid





const voteService = new VoteService(io);


const createVote = asyncHandler(async (req: Request, res: Response) => {

    const id = req.user.user_id
    const data = { userId: id, ...req.body };
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