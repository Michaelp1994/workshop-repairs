import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "../isomorphic/dataTables.validators";
import {
  assetId,
  equipmentTypeId,
  manufacturerId,
  modelId,
} from "../isomorphic/ids.validators";

const modelFilters = z
  .object({
    manufacturerId: manufacturerId.optional(),
    equipmentTypeId: equipmentTypeId.optional(),
  })
  .optional();

export const getAllModelsSchema = dataTableSchema.extend({
  filters: modelFilters,
});
export type GetAllModelsInput = z.infer<typeof getAllModelsSchema>;

export const countModelsSchema = dataTableCountSchema.extend({
  filters: modelFilters,
});
export type GetModelsCountInput = z.infer<typeof countModelsSchema>;

export const getModelsSelectSchema = getSelectSchema.extend({});

export type GetModelsSelectInput = z.infer<typeof getModelsSelectSchema>;

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
