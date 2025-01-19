import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  phoneNumber: z.string().min(1, { message: "Phone Number is required." }),
  password: z.string().min(1, { message: "Password is required." }),
  business_id: z.coerce.number()
});

// generate form types from zod validation schema
export type AddUserInput = z.infer<typeof userFormSchema>;
