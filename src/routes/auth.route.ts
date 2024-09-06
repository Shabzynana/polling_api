import { Router } from "express"
import { validateData } from "../middleware";
import { signupSchema, loginSchema } from "../schemas/authSchema";
import {
  signUp, login
} from "../controllers";

const authRoute = Router();

authRoute.post(
  "/auth/register", 
  validateData(signupSchema), 
  signUp
);

authRoute.post(
  "/auth/login", 
  validateData(loginSchema), 
  login
);

export { authRoute };