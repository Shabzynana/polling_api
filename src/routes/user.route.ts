import { Router } from "express";
import { authMiddleware } from "../middleware";
import { currentUser } from "../controllers";

const userRoute = Router();

userRoute.get(
    "/current_user", 
    authMiddleware, 
    currentUser);

 export { userRoute };   