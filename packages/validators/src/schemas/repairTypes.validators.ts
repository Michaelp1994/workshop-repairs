import { z } from "zod";

import { repairTypeId } from "./ids.validators";

export const createRepairTypeSchema = z.object({
  name: z.string().min(3),
});

export const updateRepairTypeSchema = z.object({
  id: repairTypeId,
  name: z.string().min(3),
});

export const getRepairTypeByIdSchema = z.object({
  id: repairTypeId,
});

export const archiveRepairTypeSchema = z.object({
  id: repairTypeId,
});
