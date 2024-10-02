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

    // Ensure all values are valid before sending the response
    if (!user || !access_token) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing login.",
        });
    }

    sendJsonResponse(res, 200, message, user, access_token)

});


const verifyEmail = asyncHandler(async (req: Request, res: Response) => {

    const token = req.query.token as string;
    const {user, message} = await authService.verifyEmail(token);
    sendJsonResponse(res, 200, message, user)

});    


const forgotPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {email} = req.body;
    if (!email) {
        return sendJsonResponse(res, 400, "Email is required");
    }

    const { message, data } = await authService.forgotPassword(email);
    sendJsonResponse(res, 200, message, data);
    
})


const resetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.query.token as string;
    const { new_password, confirm_password } = req.body;

    if (!token) {
        return sendJsonResponse(res, 400, "Token is required");
    }

    const { message, data } = await authService.resetPassword(token, new_password, confirm_password);
    sendJsonResponse(res, 200, message, data );
})




export { signUp, login, verifyEmail, forgotPassword, resetPassword};