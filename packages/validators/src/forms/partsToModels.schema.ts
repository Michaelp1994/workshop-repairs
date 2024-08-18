import { modelId, partId } from "@repo/validators/ids.validators";
import { z } from "zod";

export const modelPartFormSchema = z.object({
  partId,
  quantity: z.coerce.number().int().positive(),
});

export type ModelPartFormInput = z.infer<typeof modelPartFormSchema>;

export const defaultModelPart: ModelPartFormInput = {
  partId: 0,
  quantity: 1,
};

export const partModelFormSchema = z.object({
  quantity: z.coerce.number().int().positive(),
  modelId,
});

export type PartsModelFormInput = z.infer<typeof partModelFormSchema>;

export const defaultPartModel: PartsModelFormInput = {
  quantity: 1,
  modelId: 0,
};
