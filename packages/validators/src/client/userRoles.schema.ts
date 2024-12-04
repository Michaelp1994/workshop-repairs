import { z } from "zod";

export const userRoleFormSchema = z.object({
  name: z.string().min(3),
});

export type UserRoleFormInput = z.infer<typeof userRoleFormSchema>;

export const defaultUserRole: UserRoleFormInput = {
  name: "",
};
