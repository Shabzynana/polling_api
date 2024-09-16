import { Request, Response, NextFunction } from "express";
import { OptionService } from "../services/option.service";
import { asyncHandler, sendJsonResponse } from "../helpers";
import { PollService } from "../services/poll.service";

const optionService = new OptionService();
const pollService = new PollService();


const createOptionsForPoll = asyncHandler(async (req: Request, res: Response) => {

    const { pollId } = req.params;
    const {text} = req.body;
    const { option, message} = await optionService.createOptionsForPoll({ text, pollId });
  
    sendJsonResponse(res, 201, message, option)
});


export { createOptionsForPoll }