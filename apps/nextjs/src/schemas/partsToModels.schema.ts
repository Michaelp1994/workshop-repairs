import { modelId, partId } from "@repo/validators/ids.validators";
import { z } from "zod";

export const partsToModelsFormSchema = z.object({
  partId,
  quantity: z.number().int().positive(),
  modelId,
});

export type PartsToModelFormInput = z.infer<typeof partsToModelsFormSchema>;

export const defaultPartsToModels: PartsToModelFormInput = {
  partId: 0,
  quantity: 1,
  modelId: 0,
};
