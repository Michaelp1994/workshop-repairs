import { z } from "zod";

import { getAllSchema, getCountSchema } from "./dataTables.validators";
import {
  assetId,
  equipmentTypeId,
  manufacturerId,
  modelId,
} from "./ids.validators";

export const getAllModels = getAllSchema.extend({
  equipmentTypeId: equipmentTypeId.optional(),
  manufacturerId: manufacturerId.optional(),
});

export type GetAllModelsInput = z.infer<typeof getAllModels>;

export const getCount = getCountSchema.extend({
  equipmentTypeId: equipmentTypeId.optional(),
  manufacturerId: manufacturerId.optional(),
});

export type GetCountModelsInput = z.infer<typeof getCount>;

export const create = z.object({
  name: z.string().min(3),
  nickname: z.string().min(2),
  manufacturerId,
  equipmentTypeId,
});

export const update = z.object({
  id: modelId,
  name: z.string().min(3),
  manufacturerId,
  equipmentTypeId,
});

export const getById = z.object({
  id: modelId,
});

export const getByAssetId = z.object({
  assetId,
});

export const archive = z.object({
  id: modelId,
});
