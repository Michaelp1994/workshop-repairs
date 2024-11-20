import { z } from "zod";

import { repairStatusTypeId } from "./ids.validators";

export const createRepairStatusTypeSchema = z.object({
  name: z.string().min(3),
  colour: z.string().regex(/^#[A-Fa-f0-9]{6}$/),
});

export const updateRepairStatusTypeSchema = z.object({
  id: repairStatusTypeId,
  name: z.string().min(3),
});

export const getRepairStatusTypeByIdSchema = z.object({
  id: repairStatusTypeId,
});

export const archiveRepairStatusTypeSchema = z.object({
  id: repairStatusTypeId,
});
