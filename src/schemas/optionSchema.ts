import { z } from "zod";

export const optionSchema = z.object({
  text: z.string().min(1, { message: "text field cannot be empty" }),
})



