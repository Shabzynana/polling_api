import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { asyncHandler, sendJsonResponse } from "../helpers";


const userService = new UserService();


const currentUser =  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user_id  = req.user.user_id;
    const { message, user } = await userService.currentUser({ user_id });
    sendJsonResponse(res, 200, message, user);

});

export { currentUser };

