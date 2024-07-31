import { z } from "zod";

export const repairTypeFormSchema = z.object({
    name: z.string().min(3),
});

export type RepairTypeFormInput = z.infer<typeof repairTypeFormSchema>;

export const defaultRepairType: RepairTypeFormInput = {
    name: "",
};
