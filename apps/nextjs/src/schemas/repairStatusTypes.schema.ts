import { z } from "zod";

export const repairStatusTypeFormSchema = z.object({
    name: z.string().min(3),
    colour: z.string().regex(/^#[A-Fa-f0-9]{6}$/),
});

export type RepairStatusTypeFormInput = z.infer<
    typeof repairStatusTypeFormSchema
>;

export const defaultRepairStatusType: RepairStatusTypeFormInput = {
    name: "",
    colour: "#FFFFFF",
};
