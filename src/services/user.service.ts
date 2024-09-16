import AppDataSource from "../data-source";
import { User } from "../models";
import { Conflict, HttpError, ResourceNotFound, } from "../middleware";
import { formatUser } from "../utils/responsebody";
import { UserResponsePayload } from "../types";

export class UserService {

    public userRepository = AppDataSource.getRepository(User);

    public async currentUser(payload: any): Promise<{message: string; user: Partial<User>; }> {

        const { user_id }  = payload
        
        const currentUser = await this.userRepository.findOne({ where: { id: user_id } });
        if (!currentUser) {
            throw new ResourceNotFound("User not found");
        }

        const userResponse = formatUser(currentUser);
        return {user: userResponse, message:"Current logedIn User"}
    }




 }
