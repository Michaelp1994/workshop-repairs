import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
} from "../isomorphic/dataTables.validators";
import { assetStatusId } from "../isomorphic/ids.validators";

const assetStatusFilters = z.object({}).optional();

export const getAllAssetStatusesSchema = dataTableSchema.extend({
  filters: assetStatusFilters,
});
export type GetAllAssetStatusesInput = z.infer<
  typeof getAllAssetStatusesSchema
>;

export const getAssetStatusesCountSchema = dataTableCountSchema.extend({
  filters: assetStatusFilters,
});
export type GetAssetStatusesCountInput = z.infer<
  typeof getAssetStatusesCountSchema
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
