import AppDataSource from "../data-source";
import { User } from "../models";
import { hashPassword, comparePassword } from "../utils";
import { Conflict, HttpError, ResourceNotFound, } from "../middleware";
import jwt from "jsonwebtoken";
import config from "../config";
import { formatUser } from "../utils/responsebody";
import { UserResponsePayload } from "../types";


export class AuthService {

    public async signUp(payload: any): Promise<{message: string; user: Partial<User>; }> {

        const {username, email, password} = payload;
        try {
            const userExist = await User.findOne({
              where: { email }, });
            console.log(userExist, "user")  
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
            const userResponse = formatUser(createdUser);

            return {user: userResponse, message:"User Createed Successfully"}

        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
        }   
    }


    public async login(payload: any): Promise<{message: string; user: Partial<User>; access_token: string; }> {

        const {email, password} = payload;
        try {
            const user = await User.findOne({
              where: { email }, });
            if (!user) {
                throw new Conflict("User not found");
            }

            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                throw new HttpError(401, "Invalid credentials");
            }

            const access_token = jwt.sign({ user_id: user.id }, config.TOKEN_SECRET, {
                expiresIn: "1d",
            });

            const userResponse = formatUser(user)
            console.log(userResponse, "userResponse")
            return {user: userResponse, access_token: access_token, message:"Login Successfull"}
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }        
        }   
    }
    







}