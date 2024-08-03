import { z } from "zod";

import { partId, repairId, repairPartId } from "./ids.validators";

export const getAllByRepairId = z.object({
  id: repairId,
});

export const getById = z.object({
  id: repairPartId,
});

export const create = z.object({
  quantity: z.number(),
  installed: z.boolean(),
  repairId,
  partId,
});

export const update = z.object({
  id: repairPartId,
  quantity: z.number(),
  installed: z.boolean(),
  partId,
});

export const archive = z.object({
  id: repairPartId,
});
