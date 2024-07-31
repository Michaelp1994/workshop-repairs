import { z } from "zod";

export const clientFormSchema = z.object({
    name: z.string().trim().min(2),
});

export type ClientFormInput = z.infer<typeof clientFormSchema>;

export const defaultClient: ClientFormInput = {
    name: "",
};
