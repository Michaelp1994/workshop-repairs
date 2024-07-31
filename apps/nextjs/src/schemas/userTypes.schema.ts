import { z } from "zod";

export const userTypeFormSchema = z.object({
    name: z.string().min(3),
});

export type UserTypeFormInput = z.infer<typeof userTypeFormSchema>;

export const defaultUserType: UserTypeFormInput = {
    name: "",
};
