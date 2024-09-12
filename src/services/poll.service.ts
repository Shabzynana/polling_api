import AppDataSource from "../data-source";
import { User, Poll, Option } from "../models";
import { Conflict, HttpError, ResourceNotFound, } from "../middleware";
import config from "../config";
import { formatUser } from "../utils/responsebody";
import { UserResponsePayload } from "../types";


export class PollService {

    public userRepository = AppDataSource.getRepository(User);
    public pollRepository = AppDataSource.getRepository(Poll);
    public optionRepository = AppDataSource.getRepository(Option);

    public async createPoll(payload: any): Promise<{message: string; poll: Poll; }> {

        const {title, options, userId} = payload;
        try {
            const user = await this.userRepository.findOne({
              where: { id: userId }, });
            if (!user) {
                throw new Conflict("User not found");
            }

            const poll = new Poll()
            poll.title = title;
            // poll.expiresAt = expiresAt;
            poll.author = user;
            const createdPoll = await this.pollRepository.save(poll);

            // const optionEntities = options.map((text: string) => this.optionRepository.create({ text, poll }));
            // const createdOptions = await this.optionRepository.save(optionEntities);

            return {poll: createdPoll, message:"Poll Createed Successfully"}

        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
        }
    }    
}
