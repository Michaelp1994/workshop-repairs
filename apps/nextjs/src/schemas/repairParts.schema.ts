import { partId } from "@repo/validators/ids.validators";
import { z } from "zod";

export const repairPartFormSchema = z.object({
  quantity: z.coerce.number().positive(),
  installed: z.boolean(),
  partId,
});

export type RepairPartFormInput = z.infer<typeof repairPartFormSchema>;

export const defaultRepairPart: RepairPartFormInput = {
  quantity: 1,
  installed: false,
  partId: 0,
};
