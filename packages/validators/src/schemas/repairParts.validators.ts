import { z } from "zod";

import { partId, repairId, repairPartId } from "./ids.validators";

export const getAllRepairPartsByRepairIdSchema = z.object({
  id: repairId,
});

export const getRepairPartByIdSchema = z.object({
  id: repairPartId,
});

export const createRepairPartSchema = z.object({
  quantity: z.number(),
  installed: z.boolean(),
  repairId,
  partId,
});

export const updateRepairPartSchema = z.object({
  id: repairPartId,
  quantity: z.number(),
  installed: z.boolean(),
  partId,
});

export const archiveRepairPartSchema = z.object({
  id: repairPartId,
});
