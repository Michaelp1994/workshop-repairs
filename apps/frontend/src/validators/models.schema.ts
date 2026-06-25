import { z } from "zod";

export const modelFormSchema = z.object({
  name: z.string().min(3),
  nickname: z.string(),
  manufacturerId: z.string().min(1),
  equipmentTypeId: z.string().min(1),
});

export type ModelFormInput = z.infer<typeof modelFormSchema>;

export const defaultModel: ModelFormInput = {
  name: "",
  nickname: "",
  manufacturerId: "",
  equipmentTypeId: "",
};
