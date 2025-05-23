import { z } from "zod";

export const partFormSchema = z.object({
  name: z.string().min(3),
  partNumber: z.string().min(3),
  description: z.string(),
});

export type PartFormInput = z.infer<typeof partFormSchema>;

export const defaultPart: PartFormInput = {
  name: "",
  partNumber: "",
  description: "",
};
