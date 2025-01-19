import { z } from "zod";

export const serviceFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    description: z.string().min(1, { message: "Description is required." }),
    charge_type: z.string().min(1, { message: "Charge type is required." }),
    charge: z.coerce.number().positive(),
    business_id: z.coerce.number(),
});

// generate form types from zod validation schema
export type AddServiceInput = z.infer<typeof serviceFormSchema>;
