import { z } from "zod";
import { manufacturerId } from "@repo/validators/ids.validators";

export const modelFormSchema = z.object({
  name: z.string().min(3),
  nickname: z.string(),
  manufacturerId,
});

export type ModelFormInput = z.infer<typeof modelFormSchema>;

export const defaultModel: ModelFormInput = {
  name: "",
  nickname: "",
  manufacturerId: 0,
};
