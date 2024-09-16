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

    public async getUsers(): Promise<{ data: UserResponsePayload[]; message: string; }> {
        try {    
          const users = await this.userRepository.find();
          console.log(users, "users")
          if (!users.length) {
            throw new ResourceNotFound("No users found");
          }
          
          const usersResponse = users.map((user) => formatUser(user));
          return { data: usersResponse, message: "Users fetched successfully" };
          
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }      
        }
    }





 }
