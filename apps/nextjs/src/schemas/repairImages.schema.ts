import { z } from "zod";

export const repairImageFormSchema = z.object({
  caption: z.string().min(3),
  url: z.string().min(3),
});

export type RepairImageFormInput = z.infer<typeof repairImageFormSchema>;

export const defaultRepairImage: RepairImageFormInput = {
  caption: "",
  url: "",
};
