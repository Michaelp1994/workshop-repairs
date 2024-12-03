import { z } from "zod";

import { repairId, repairImageId } from "../isomorphic/ids.validators";
import { dataTableCountSchema, dataTableSchema } from "./dataTables.validators";

const repairImageFilters = z.object({}).optional();

export const getAllRepairImagesSchema = dataTableSchema.extend({
  filters: repairImageFilters,
});
export type GetAllRepairImagesInput = z.infer<typeof getAllRepairImagesSchema>;

export const countRepairImagesSchema = dataTableCountSchema.extend({
  filters: repairImageFilters,
});
export type CountRepairImagesInput = z.infer<typeof countRepairImagesSchema>;

export const getAllRepairImagesByRepairIdSchema = z.object({
  repairId,
});

export const getRepairImageByIdSchema = z.object({
  id: repairImageId,
});

export const createRepairImageSchema = z.object({
  caption: z.string().min(3),
  fileName: z.string(),
  repairId,
});

export const requestUploadRepairImageSchema = z.object({
  fileType: z.string(),
  fileSize: z.number().int().min(1),
});

export const updateRepairImageSchema = z.object({
  id: repairImageId,
  caption: z.string().min(3),
  url: z.string().min(3),
});

export const archiveRepairImageSchema = z.object({
  id: repairImageId,
});
