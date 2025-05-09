import { z } from "zod";

import { partId } from "../isomorphic/ids.validators";

export const repairPartFormSchema = z.object({
  quantity: z.number().positive(),
  installed: z.boolean(),
  partId,
});

export type RepairPartFormInput = z.infer<typeof repairPartFormSchema>;

export const defaultRepairPart: RepairPartFormInput = {
  quantity: 1,
  installed: false,
  partId: 0,
};
