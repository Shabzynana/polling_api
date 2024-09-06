import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { asyncHandler, sendJsonResponse } from "../helpers";

const authService = new AuthService();

const signUp = asyncHandler(async (req: Request, res: Response) => {

    const {user, message} = await authService.signUp(req.body);
    sendJsonResponse(res, 201, message, user)

});

export { signUp};