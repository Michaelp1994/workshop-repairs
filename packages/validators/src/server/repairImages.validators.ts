import { z } from "zod";

import { repairId, repairImageId } from "../isomorphic/ids.validators";

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
