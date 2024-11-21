import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
} from "../isomorphic/dataTables.validators";
import { repairId, repairImageId } from "../isomorphic/ids.validators";

const repairImageFilters = z.object({}).optional();

export const getAllRepairImagesSchema = dataTableSchema.extend({
  filters: repairImageFilters,
});
export type GetAllRepairImagesInput = z.infer<typeof getAllRepairImagesSchema>;

export const getRepairImagesCountSchema = dataTableCountSchema.extend({
  filters: repairImageFilters,
});
export type GetRepairImagesCountInput = z.infer<
  typeof getRepairImagesCountSchema
>;

export const getAllRepairImagesByRepairIdSchema = z.object({
  repairId,
});

export const getRepairImageByIdSchema = z.object({
  id: repairImageId,
});

export const createRepairImageSchema = z.object({
  caption: z.string().min(3),
  url: z.string().min(3),
  repairId,
});

export const updateRepairImageSchema = z.object({
  id: repairImageId,
  caption: z.string().min(3),
  url: z.string().min(3),
});

export const archiveRepairImageSchema = z.object({
  id: repairImageId,
});
