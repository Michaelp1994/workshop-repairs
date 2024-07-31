import { z } from "zod";

export const locationFormSchema = z.object({
    name: z.string().min(3),
    address: z.string().min(3),
});

export type LocationFormInput = z.infer<typeof locationFormSchema>;

export const defaultLocation: LocationFormInput = {
    name: "",
    address: "",
};
