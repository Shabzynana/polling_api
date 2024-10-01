import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, { message: "Password cannot be empty" }),
  username: z.string().min(1, { message: "Username cannot be empty" }),
  first_name: z.string().min(1, { message: "First name cannot be empty" }),
  last_name: z.string().min(1, { message: "Last name cannot be empty" }),
  admin_secret: z.string().optional(),
})

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, { message: "Password cannot be empty" }),
})


export {
  signupSchema, loginSchema
};
