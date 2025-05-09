import AppDataSource from "../data-source";
import { User, Poll, Option } from "../models";
import { Conflict, HttpError, ResourceNotFound, } from "../middleware";
import config from "../config";
import { formatOption } from "../utils/responsebody";
import { OptionResponsePayload } from "../types";



export class OptionService {

    public userRepository = AppDataSource.getRepository(User);
    public pollRepository = AppDataSource.getRepository(Poll);
    public optionRepository = AppDataSource.getRepository(Option);


    public async createOptionsForPoll(payload: any): Promise<{message: string; option: OptionResponsePayload }> {

        const {text, pollId} = payload;
        try {
            const poll = await this.pollRepository.findOne({
              where: { id: pollId } });
            if (!poll) {
                throw new Conflict("Poll not found");
            }

            const option = new Option()
            option.text = text;
            option.poll = poll;

            const createdOption = await this.optionRepository.save(option);
            return {
                option: formatOption(createdOption), 
                message:"Option Createed Successfully"
            }
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
        }       
    }   
    
    
    public async getOptionsForPoll(pollId: string): Promise<{ data: Poll; message: string; }> {
        try {
            const options = await this.pollRepository.findOne({
              where: { id: pollId }, relations : { options: true } });
            if (!options) {
                throw new ResourceNotFound("Options not found");
            }
            return { 
                data: options, 
                message: "Options fetched successfully" 
            };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
        }
    }


}    