import { z } from "zod";

export const permissionFormSchema = z.object({
    can_create: z.string(),
    can_view: z.string(),
    can_delete: z.string(),
    can_update: z.string(),
    business_id: z.number(),
    permission_id: z.number(),
    role_id: z.string(),
});

// generate form types from zod validation schema
export type AddPermissionInput = z.infer<typeof permissionFormSchema>;
