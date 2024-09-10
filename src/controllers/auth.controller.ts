import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { asyncHandler, sendJsonResponse } from "../helpers";

const authService = new AuthService();

const signUp = asyncHandler(async (req: Request, res: Response) => {

    const {user, message} = await authService.signUp(req.body);
    sendJsonResponse(res, 201, message, user)

});


// const login = asyncHandler(async (req: Request, res: Response) => {

//     const {users, message, access_token} = await authService.login(req.body);
//     sendJsonResponse(res, 200, message, users, access_token)

// });

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { access_token, users } = await authService.login(req.body);
      return res.status(200).json({ access_token, users });
    } catch (error) {
      next(error);
    }
};

const getUsers = asyncHandler( async (req: Request, res: Response) => {
   
    const users = await authService.getUsers();
    const allusers = { users };
    sendJsonResponse(res, 200, "Successfully retrievedddd users", allusers);
  
});

// const getUsers = async (req: Request, res: Response) => {
//     try {
//       const users = await authService.getUsers();
//       if (!users) {
//         return sendJsonResponse(res, 500, "Could not get users");
//       }
//       const allusers = { users };
//       sendJsonResponse(res, 200, "Successfully retrieved users", allusers);
//     } catch (error) {
//       return sendJsonResponse(res, error.status || 500, error.message || error);
//     }
// };
  


export { signUp, login, getUsers};