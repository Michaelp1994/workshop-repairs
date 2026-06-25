import { z } from "zod";

export const repairPartFormSchema = z.object({
  quantity: z.number().positive(),
  installed: z.boolean(),
  partId: z.string().min(1),
});

export type RepairPartFormInput = z.infer<typeof repairPartFormSchema>;

export const defaultRepairPart: RepairPartFormInput = {
  quantity: 1,
  installed: false,
  partId: "",
};
