import AppDataSource from "../data-source";
import { User, Poll, Option } from "../models";
import { Conflict, HttpError, ResourceNotFound, } from "../middleware";
import config from "../config";
import { formatPoll, formatPollPayload } from "../utils/responsebody";
import { PollResponsePayload, PollPayload } from "../types";


export class PollService {

    public userRepository = AppDataSource.getRepository(User);
    public pollRepository = AppDataSource.getRepository(Poll);
    public optionRepository = AppDataSource.getRepository(Option);

    public async createPoll(payload: any): Promise<{message: string; poll: PollPayload; }> {

        const {title, userId} = payload;
        try {
            const user = await this.userRepository.findOne({
              where: { id: userId }, });
            if (!user) {
                throw new Conflict("User not found");
            }

            const poll = new Poll()
            poll.title = title;
            poll.author = user;
            const createdPoll = await this.pollRepository.save(poll);

            return {poll: formatPollPayload(createdPoll), message:"Poll Createed Successfully"}

        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
        }
    }
    
    public async getPolls(): Promise<{ polls: PollResponsePayload[]; message: string; }> {
        try {
          const polls = await this.pollRepository.find();
          if (!polls.length) {
            throw new ResourceNotFound("No polls found");
          }

          const pollsResponse = polls.map((poll) => formatPoll(poll));

          return { polls: pollsResponse, message: "Polls fetched successfully" };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }      
        }
    }

    public async getPollById(pollId: string): Promise<{ data: PollResponsePayload; message: string; }> {
        try {
            const poll = await this.pollRepository.findOne({
              where: { id: pollId }, });
            if (!poll) {
                throw new ResourceNotFound("Poll not found");
            }
            const pollResponse = formatPoll(poll);

            return { data: pollResponse, message: "Poll fetched successfully"};
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }      
        }
    }
}
