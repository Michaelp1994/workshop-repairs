import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "./dataTables.validators";
import { assetStatusId } from "./ids.validators";

const assetStatusFilters = z.object({}).default({});

export const getAllAssetStatusesSchema = dataTableSchema.extend({
  filters: assetStatusFilters,
});
export type GetAllAssetStatusesInput = z.infer<
  typeof getAllAssetStatusesSchema
>;

export const countAssetStatusesSchema = dataTableCountSchema.extend({
  filters: assetStatusFilters,
});
export type CountAssetStatusesInput = z.infer<typeof countAssetStatusesSchema>;

export const getAssetStatusesSelectSchema = getSelectSchema.extend({
  filters: assetStatusFilters,
});

export type GetAssetStatusesSelectInput = z.infer<
  typeof getAssetStatusesSelectSchema
>;

export const createAssetStatusSchema = z.object({
  name: z.string().min(3),
});

export const updateAssetStatusSchema = z.object({
  id: assetStatusId,
  name: z.string().min(3),
});

export const getAssetStatusByIdSchema = z.object({
  id: assetStatusId,
});

export const archiveAssetStatusSchema = z.object({
  id: assetStatusId,
});
