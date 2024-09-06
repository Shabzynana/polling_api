import { Router } from "express"
import { validateData } from "../middleware";
import { signupSchema } from "../schemas/authSchema";
import {
  signUp,
} from "../controllers";

const authRoute = Router();

authRoute.post(
  "/auth/register", 
  validateData(signupSchema), 
  signUp
);

export { authRoute };