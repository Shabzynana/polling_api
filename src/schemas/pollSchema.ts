import { z } from "zod";

const pollSchema = z.object({
  title: z.string().min(1, { message: "title field cannot be empty" }),
})


export {
  pollSchema
};
