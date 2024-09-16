import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { asyncHandler, sendJsonResponse } from "../helpers";

const authService = new AuthService();

const signUp = asyncHandler(async (req: Request, res: Response) => {

    const {user, message} = await authService.signUp(req.body);
    sendJsonResponse(res, 201, message, user)

});


// const login = asyncHandler(async (req: Request, res: Response) => {

//     const {user, message, access_token} = await authService.login(req.body);


//     console.log(user, "user");

//     // Ensure all values are valid before sending the response
//     if (!user || !access_token) {
//         return res.status(500).json({
//             success: false,
//             message: "An error occurred while processing login.",
//         });
//     }

//     sendJsonResponse(res, 200, message, user, access_token)

// });

const login = asyncHandler(async (req: Request, res: Response) => {
    try {
        // Call the login service
        const { user, message, access_token } = await authService.login(req.body);
        console.log(user, "user");

        // Ensure all values are valid before sending the response
        if (!user || !access_token) {
            return res.status(500).json({
                success: false,
                message: "An error occurred while processing login.",
            });
        }

        // Send response if everything is valid
        sendJsonResponse(res, 200, message, user, access_token);

    } catch (error) {
        console.error(error);
        // Handle error cases
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
});



const getUsers = asyncHandler( async (req: Request, res: Response) => {
   
    const { data, message} = await authService.getUsers();
    sendJsonResponse(res, 200, message, data);
  
});



export { signUp, login, getUsers};