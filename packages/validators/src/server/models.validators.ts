import { z } from "zod";

import {
  assetId,
  equipmentTypeId,
  manufacturerId,
} from "../isomorphic/ids.validators";
import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "./dataTables.validators";

const modelFilters = z
  .object({
    manufacturerId: manufacturerId.optional(),
    equipmentTypeId: equipmentTypeId.optional(),
  })
  .default({});

export type ModelFilters = z.infer<typeof modelFilters>;

export const getAllModelsSchema = dataTableSchema.extend({
  filters: modelFilters,
});
export type GetAllModelsInput = z.infer<typeof getAllModelsSchema>;

export const countModelsSchema = dataTableCountSchema.extend({
  filters: modelFilters,
});
export type CountModelsInput = z.infer<typeof countModelsSchema>;

export const getModelsSelectSchema = getSelectSchema.extend({
  filters: modelFilters,
});

export type GetModelsSelectInput = z.infer<typeof getModelsSelectSchema>;

export const createModelSchema = z.object({
  name: z.string().min(3),
  nickname: z.string().min(2),
  manufacturerId,
  equipmentTypeId,
});

export const updateModelSchema = createModelSchema.partial().extend({
  id: z.string(),
});

export const getModelByIdSchema = z.object({
  id: z.string(),
});

export const getModelByAssetIdSchema = z.object({
  assetId,
});

export const archiveModelSchema = z.object({
  id: z.string(),
});
