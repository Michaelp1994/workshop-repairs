import { z } from "zod";

import { getAllSchema, getCountSchema } from "./dataTables.validators";
import {
  assetId,
  equipmentTypeId,
  manufacturerId,
  modelId,
} from "./ids.validators";

export const getAllModelsSchema = getAllSchema.extend({
  equipmentTypeId: equipmentTypeId.optional(),
  manufacturerId: manufacturerId.optional(),
});

export type GetAllModelsInput = z.infer<typeof getAllModelsSchema>;

export const getModelsCountSchema = getCountSchema.extend({
  equipmentTypeId: equipmentTypeId.optional(),
  manufacturerId: manufacturerId.optional(),
});

export type GetCountModelsInput = z.infer<typeof getModelsCountSchema>;

export const createModelSchema = z.object({
  name: z.string().min(3),
  nickname: z.string().min(2),
  manufacturerId,
  equipmentTypeId,
});

export const updateModelSchema = z.object({
  id: modelId,
  name: z.string().min(3),
  manufacturerId,
  equipmentTypeId,
});

export const getModelByIdSchema = z.object({
  id: modelId,
});

export const getModelByAssetIdSchema = z.object({
  assetId,
});

export const archiveModelSchema = z.object({
  id: modelId,
});
