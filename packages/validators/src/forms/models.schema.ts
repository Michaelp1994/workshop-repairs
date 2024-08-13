import {
  equipmentTypeId,
  manufacturerId,
} from "@repo/validators/ids.validators";
import { z } from "zod";

export const modelFormSchema = z.object({
  name: z.string().min(3),
  nickname: z.string(),
  manufacturerId,
  equipmentTypeId,
});

export type ModelFormInput = z.infer<typeof modelFormSchema>;

export const defaultModel: ModelFormInput = {
  name: "",
  nickname: "",
  manufacturerId: 0,
  equipmentTypeId: 0,
};
