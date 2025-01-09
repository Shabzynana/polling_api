import AppDataSource from "../data-source";
import { User, Poll, Option, Vote } from "../models";
import { Conflict, HttpError, ResourceNotFound, } from "../middleware";
import log from "../utils/logger";
import config from "../config";
import { formatUser } from "../utils/responsebody";
import { UserResponsePayload } from "../types";
import type { Server } from 'socket.io';
// import { io } from "../app";;



export class VoteService {

    private io: Server;

    constructor(io: Server) {
        this.io = io;
        console.log('Socket.IO instance receivedd service:', !!io);  // Check if the io instance is valid

    }

    public userRepository = AppDataSource.getRepository(User);
    public pollRepository = AppDataSource.getRepository(Poll);
    public optionRepository = AppDataSource.getRepository(Option);
    public voteRepository = AppDataSource.getRepository(Vote);

    // public async createVote(payload: any): Promise<{message: string; vote: any; }> {
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
            console.log("Loaded options:", poll.options);


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

            const vote = new Vote()
            vote.user = user;
            vote.poll = poll;
            vote.option = option;

            const createdVote = await this.voteRepository.save(vote);
            // console.log("createdVote", createdVote);
          

            const pollaftervote = await this.pollRepository.findOne({
                where: { id: pollId },
                relations: ["options", "options.votes"],
            });


            const results = (pollaftervote.options || []).map((opt) => ({
                optionId: opt.id,
                text: opt.text,
                voteCount: opt.votes ? opt.votes.length : 0,
            }));

            console.log("results", results);

            // this.io.emit('vote-updated', 
            //     results
            // );
            // if (this.io) {
            //     this.io.emit("vote-updated", {
            //       results,
            //     });
            // } else {
            //     console.error("Socket.IO instance is not initialized.");
            // }
            console.log("Socket.IO instance:", this.io);  // Add this log to check if 'this.io' is defined

            try {
                this.io.emit("vote-updated", {
                    results,
                })
            } catch (error) {
                console.error("Error emitting event:", error);
            }

            // return {vote: createdVote, message:"Vote Createed Successfully"}
            return {message:"Vote Createed Successfully"}

        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
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



}