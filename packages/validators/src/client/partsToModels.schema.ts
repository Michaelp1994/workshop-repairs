import { z } from "zod";

import { modelId, partId } from "../isomorphic/ids.validators";

export const modelPartFormSchema = z.object({
  partId,
  quantity: z.number().int().positive(),
});

export type ModelPartFormInput = z.infer<typeof modelPartFormSchema>;

export const defaultModelPart: ModelPartFormInput = {
  partId: 0,
  quantity: 1,
};

export const partModelFormSchema = z.object({
  quantity: z.number().int().positive(),
  modelId,
});

export type PartsModelFormInput = z.infer<typeof partModelFormSchema>;

export const defaultPartModel: PartsModelFormInput = {
  quantity: 1,
  modelId: 0,
};
