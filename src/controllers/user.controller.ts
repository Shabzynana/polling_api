import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { asyncHandler, sendJsonResponse } from "../helpers";


const userService = new UserService();


const currentUser =  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user_id  = req.user.user_id;
    const { message, user } = await userService.currentUser({ user_id });
    sendJsonResponse(res, 200, message, user);

});

const getUsers = asyncHandler( async (req: Request, res: Response) => {
   
    const { data, message} = await userService.getUsers();
    sendJsonResponse(res, 200, message, data);
  
});

export { currentUser, getUsers };

