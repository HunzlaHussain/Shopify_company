import { z } from "zod";

export const signUpFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.coerce.string().email().min(1, { message: "Email is required." }),
    password: z.string().min(1, { message: "Password is required." }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required." }),
    isAgree: z.coerce.boolean().refine(bool => bool == true, {
        message: 'You must agree to our terms and conditions'
    })
});

// generate form types from zod validation schema
export type SignUpInput = z.infer<typeof signUpFormSchema>;
