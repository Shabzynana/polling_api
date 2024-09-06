import AppDataSource from "../data-source";
import { User } from "../models";
import { hashPassword, comparePassword } from "../utils";
import { Conflict, HttpError } from "../middleware";

export class AuthService {

    public async signUp(payload): Promise<{message: string; user: Partial<User>; }> {

        const {username, email, password} = payload;
        try {
            const userExist = await User.findOne({
              where: { email }, });
            if (userExist) {
                throw new Conflict("User already exists");
            }

            const usernameExist = await User.findOne({
                where: { username }, });
            if (usernameExist) {
                throw new Conflict("username already exist, choose another!");
            }

            const hashedPassword = await hashPassword(password)
            const user = new User()
            user.username = username;
            user.email = email;
            user.password = hashedPassword;

            const createdUser = await AppDataSource.manager.save(user);

            return {user: createdUser, message:"User Createed"}

        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
        }   
    }







}