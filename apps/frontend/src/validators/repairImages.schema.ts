import { z } from "zod";

const TEN_MEGABYTES = 10_000_000;
export const repairImageFormSchema = z.object({
  caption: z.string().min(3),
  image: z.file().max(TEN_MEGABYTES), //.type(["image/png", "image/jpeg"]),
});

export type RepairImageFormInput = z.infer<typeof repairImageFormSchema>;

export const defaultRepairImage: RepairImageFormInput = {
  caption: "",
  image: null as unknown as File,
};
