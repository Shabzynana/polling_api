import AppDataSource from "../data-source";
import { User, Poll, Option, Vote } from "../models";
import { Conflict, HttpError, ResourceNotFound, } from "../middleware";
import log from "../utils/logger";
import config from "../config";
import { formatUser } from "../utils/responsebody";
import { UserResponsePayload } from "../types";
import { emitSocketEvent } from "../middleware/io";


export class VoteService {

    constructor() {}

    public userRepository = AppDataSource.getRepository(User);
    public pollRepository = AppDataSource.getRepository(Poll);
    public optionRepository = AppDataSource.getRepository(Option);
    public voteRepository = AppDataSource.getRepository(Vote);

    public async createVote(payload: any): Promise<{message: string; }> {
    

        const {userId, pollId, optionId} = payload;
        try {
            const user = await this.userRepository.findOne({
              where: { id: userId } });
            if (!user) {
                throw new Conflict("User not found");
            }

            const poll = await this.pollRepository.findOne({
                where: { id: pollId },
                relations: ["options", "options.votes"],
            });
           
            if (!poll) {
                throw new Conflict("Poll not found");
            }

            const option = await this.optionRepository.findOne({
              where: { id: optionId, poll: { id: pollId }},
              relations: [ 'poll', 'votes' ] });
            if (!option) {
                throw new Conflict("Option not found");
            }

            const existingVote = await this.voteRepository.findOne(
                { where: { poll : { id: pollId }, user: { id: userId } } });
            if (existingVote) {
                throw new Conflict('You have already voted on this poll');
            }
            
            try {
                const vote = new Vote()
                vote.user = { id: user.id } as User;
                vote.poll = { id: poll.id } as Poll;
                vote.option = { id: option.id } as Option;
                console.log("vote", vote)
                console.log('vote.user', vote.user);
                console.log('vote.poll', vote.poll);
                console.log('vote.option', vote.option);
                const createdVote = await this.voteRepository.save(vote);
            } catch (error) {
                console.error("Error creating vote:", error);
                console.log("error", error.type)
                console.log("error", error.message)
            }
             
         
            const pollaftervote = await this.pollRepository.findOne({
                where: { id: pollId },
                relations: ["options", "options.votes"],
            });

            const results = (pollaftervote.options || []).map((opt) => ({
                pollId: pollaftervote.id,
                pollName: pollaftervote.title,
                optionId: opt.id,
                text: opt.text,
                voteCount: opt.votes ? opt.votes.length : 0,
            }));
            
            try {
                emitSocketEvent("vote-updated", `poll-${pollId}`, results);
            } catch (err) {
                console.error("Error emitting event:", err);
            }

            return {
                message:"Vote Createed Successfully"
            }

        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            console.error("Unexpected error in createVote:", error);
            throw new Error("Internal Server Error");
        }       
    }


    public async getPollresults(pollId: string): Promise<{data: any; message: string;}> {

        const poll = await this.pollRepository.findOne({
            where: { id: pollId },
            relations: [ 'options', 'options.votes' ],
        });
        if (!poll) {
            throw new ResourceNotFound("Poll not found");
        }

        const results = poll.options.map(option => ({
            optionId: option.id,
            text: option.text,
            votes: option.votes ? option.votes.length : 0,
          }));
      
        return { data: results, message: "Final Result" };

    }

    public async getallPollresults(): Promise<{data: any; message: string;}> {
        const polls = await this.pollRepository.find({
            relations: [ 'options', 'options.votes' ],
        });

        const results = polls.map(poll => ({
            pollId: poll.id,
            title: poll.title,
            options: poll.options.map(option => ({
              optionId: option.id,
              text: option.text,
              votes: option.votes ? option.votes.length : 0,
            })),
          }));
      
        return { data: results, message: "Final Result" };
        
    }    



}