import AppDataSource from "../data-source";
import { User, UserType } from "../models";
import { hashPassword, comparePassword } from "../utils";
import { Conflict, HttpError, ResourceNotFound, Unauthorized } from "../middleware";
import jwt from "jsonwebtoken";
import config from "../config";
import { formatUser } from "../utils/responsebody";
import log from "../utils/logger";
import { IUserSignUp, JwtPayload } from "../types";
import sendEmailTemplate from "../views/email/sendEmailTemplate";

export class AuthService {

    public userRepository = AppDataSource.getRepository(User)

    public async signUp(payload: IUserSignUp): Promise<{message: string; user: Partial<User>; }> {

        const {username, email, admin_secret, first_name, last_name, password}  = payload;

        try {
            const userExist = await User.findOne({
              where: { email }, });
            if (userExist) {
                if (userExist.is_deleted) {
                    throw new HttpError(
                        403,
                        "Account associated with these email has been deleted. Please contact support for assistance.",
                      );
                }
                throw new Conflict("User already exists");
            }

            const usernameExist = await User.findOne({
                where: { username }, });
            if (usernameExist) {
                throw new Conflict("username already exist, choose another!");
            }

            const hashedPassword = await hashPassword(password)
            const user = new User()
            user.first_name = first_name
            user.last_name = last_name
            user.username = username;
            user.email = email;
            user.password = hashedPassword;
            user.user_type = (admin_secret && admin_secret === config.ADMIN_SECRET_KEY ) ? UserType.ADMIN : UserType.USER;

            const createdUser = await AppDataSource.manager.save(user);

            const sendToken = jwt.sign({ user_id: user.id }, config.TOKEN_SECRET, {expiresIn: "1h" });
            const verifyUrl = `${config.BASE_URL}/verify_email?token=${sendToken}`;
            await sendEmailTemplate({
                to: email,
                subject: "Verify your Email",
                templateName: "verify_email",
                variables: {
                  name: user?.last_name,
                  verifyUrl,
                },
            });
            const userResponse = formatUser(createdUser);

            return {
                user: userResponse, 
                message:"User Createed Successfully"
            }

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
            log.info( ["userResponse", userResponse])   
            return {
                user: userResponse, 
                access_token: access_token, 
                message:"Login Successfull"
            }
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }        
        }   
    }


    public async verifyEmail(token: string): Promise<{ message: string; user: Partial<User>; }> {
        try {
            const payload = jwt.verify(token, config.TOKEN_SECRET) as JwtPayload;
            const user = await this.userRepository.findOne({
                where: { id: payload["user_id"] as string },
            });
            console.log(user, 'user')
            if (!user) {
                throw new HttpError(404, "User not Found");
            }
        
            user.is_verified = true;
            user.is_verified_date = new Date();
            await this.userRepository.save(user);
            console.log(user, "verified User")
            return {
                message: "Email verified successfully",
                user: formatUser(user),
            };
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Unauthorized("Token has expired");
            } else if (error.name === 'JsonWebTokenError') {
                throw new Unauthorized("Invalid token");
            } else {
                if(error instanceof HttpError) {
                    throw error;
                } 
            }
        } 
    }



    public async forgotPassword(email: string): Promise<{message: string; data: Partial<User>}> {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw new ResourceNotFound("User not found");
        }
        const sendToken = jwt.sign({ user_id: user.id }, config.TOKEN_SECRET, {expiresIn: "1h" });
        const resetUrl = `${config.BASE_URL}/reset-password?token=${sendToken}`;
        await sendEmailTemplate({
            to: email,
            subject: "Reset your password",
            templateName: "password-reset",
            variables: {
              name: user?.last_name,
              resetUrl,
            },  
        });  
        
        return { 
            message: "Password reset link sent to your email", 
            data: formatUser(user)
        }
    }


    public async resetPassword(
        token: string,
        new_password: string,
        confirm_password: string): Promise<{message: string; data: Partial<User>}> {

        try {
            const payload = jwt.verify(token, config.TOKEN_SECRET) as JwtPayload;
            const user = await this.userRepository.findOne({
                where: { id: payload["user_id"] as string },
            });
            if (!user) {
                throw new ResourceNotFound("User not Found");
            }

            if (new_password !== confirm_password) {
                throw new HttpError(400, "Passwords do not match");
            }
            const hashedPassword = await hashPassword(new_password);
            user.password = hashedPassword;
            await AppDataSource.manager.save(user);
            return {
                message: "Password reset successfully",
                data: formatUser(user)
            };
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Unauthorized("Token has expired");
            } else if (error.name === 'JsonWebTokenError') {
                throw new Unauthorized("Invalid token");
            } else {
                if(error instanceof HttpError) {
                    throw error;
                } 
            }      
        }

        
    }


    







}