import { Router } from "express";
import { authMiddleware } from "../middleware";
import { currentUser, getUsers } from "../controllers";

const userRoute = Router();

userRoute.get(
    "/current_user", 
    authMiddleware, 
    currentUser);


userRoute.get(
    "/users",
    authMiddleware,
    getUsers
);
      

 export { userRoute };   