import { Router } from "express"
import { validateData } from "../middleware";
import { signupSchema, loginSchema } from "../schemas/authSchema";
import {
  signUp, login, verifyEmail, forgotPassword, resetPassword
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

authRoute.get(
  "/auth/verify-email",
  verifyEmail
)

authRoute.post(
  "/auth/forgot-password",
  forgotPassword
)    

authRoute.post(
  "/auth/reset-password",
  resetPassword
)


export { authRoute };