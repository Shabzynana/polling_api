import AppDataSource from "../data-source";
import { User, Poll, Option } from "../models";
import { Conflict, HttpError, ResourceNotFound, } from "../middleware";
import config from "../config";
import { formatUser } from "../utils/responsebody";
import { UserResponsePayload } from "../types";



export class OptionService {

    public userRepository = AppDataSource.getRepository(User);
    public pollRepository = AppDataSource.getRepository(Poll);
    public optionRepository = AppDataSource.getRepository(Option);


    public async createOptionsForPoll(payload: any): Promise<{message: string; option: Option; }> {

        const {text, pollId} = payload;
        try {
            const poll = await this.pollRepository.findOne({
              where: { id: pollId }, });
            if (!poll) {
                throw new Conflict("Poll not found");
            }

            const option = new Option()
            option.text = text;
            option.poll = poll;
            const createdOption = await this.optionRepository.save(option);

            return {option: createdOption, message:"Option Createed Successfully"}
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
        }       
    }    


}    