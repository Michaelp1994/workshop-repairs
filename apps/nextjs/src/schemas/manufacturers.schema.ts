import { z } from "zod";

export const manufacturerFormSchema = z.object({
    name: z.string().min(3),
});

export type ManufacturerFormInput = z.infer<typeof manufacturerFormSchema>;

export const defaultManufacturer: ManufacturerFormInput = {
    name: "",
};
