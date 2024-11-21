import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
} from "../isomorphic/dataTables.validators";
import { modelId, partId } from "../isomorphic/ids.validators";

const partToModelFilters = z.object({}).optional();

export const getAllPartsToModelSchema = dataTableSchema.extend({
  filters: partToModelFilters,
});
export type GetAllPartsToModelInput = z.infer<typeof getAllPartsToModelSchema>;

export const getPartsToModelCountSchema = dataTableCountSchema.extend({
  filters: partToModelFilters,
});
export type GetPartsToModelCountInput = z.infer<
  typeof getPartsToModelCountSchema
>;

export const createPartToModelSchema = z.object({
  quantity: z.number().positive(),
  partId,
  modelId,
});

export const getPartToModelByIdSchema = z.object({
  partId,
  modelId,
});

export const updatePartToModelSchema = z.object({
  quantity: z.number().positive(),
  partId,
  modelId,
});

export const archivePartToModelSchema = z.object({
  partId,
  modelId,
});
