import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { asyncHandler, sendJsonResponse } from "../helpers";

const authService = new AuthService();

const signUp = asyncHandler(async (req: Request, res: Response) => {

    const {user, message} = await authService.signUp(req.body);
    sendJsonResponse(res, 201, message, user)

});


const login = asyncHandler(async (req: Request, res: Response) => {

    const {user, message, access_token} = await authService.login(req.body);
    sendJsonResponse(res, 200, message, user, access_token)

});

// const login = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { users } = await authService.login(req.body);
//       return res.status(200).json({ users });
//     } catch (error) {
//       next(error);
//     }
// };

const getUsers = asyncHandler( async (req: Request, res: Response) => {
   
    const users = await authService.getUsers();
    const allusers = { users };
    sendJsonResponse(res, 200, "Successfully retrievedddd users", allusers);
  
});



export { signUp, login, getUsers};