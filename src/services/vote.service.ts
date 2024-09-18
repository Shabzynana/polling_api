import AppDataSource from "../data-source";
import { User, Poll, Option, Vote } from "../models";
import { Conflict, HttpError, ResourceNotFound, } from "../middleware";
import log from "../utils/logger";
import config from "../config";
import { formatUser } from "../utils/responsebody";
import { UserResponsePayload } from "../types";


export class VoteService {

    public userRepository = AppDataSource.getRepository(User);
    public pollRepository = AppDataSource.getRepository(Poll);
    public optionRepository = AppDataSource.getRepository(Option);
    public voteRepository = AppDataSource.getRepository(Vote);

    public async createVote(payload: any): Promise<{message: string; vote: Partial<Vote>; }> {

        const {userId, pollId, optionId} = payload;
        try {
            const user = await this.userRepository.findOne({
              where: { id: userId } });
            if (!user) {
                throw new Conflict("User not found");
            }

            const poll = await this.pollRepository.findOne({
              where: { id: pollId } });
            if (!poll) {
                throw new Conflict("Poll not found");
            }

            const option = await this.optionRepository.findOne({
              where: { id: optionId, poll: { id: pollId }} });
            if (!option) {
                throw new Conflict("Option not found");
            }

            const existingVote = await this.voteRepository.findOne(
                { where: { poll : { id: pollId }, user: { id: userId } } });
            log.info(existingVote);
            if (existingVote) {
                throw new Conflict('You have already voted on this poll');
            }

            const vote = new Vote()
            vote.user = user;
            vote.poll = poll;
            vote.option = option;

            const createdVote = await this.voteRepository.save(vote);
            return {vote: createdVote, message:"Vote Createed Successfully"}

        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
        }       
    }



}