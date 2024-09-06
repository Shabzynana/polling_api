import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, { message: "Password cannot be empty" }),
  username: z.string().min(1, { message: "Username cannot be empty" }),
})

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, { message: "Password cannot be empty" }),
})



export {
  signupSchema, loginSchema
};
