import { z } from "zod";

import { repairId, repairImageId } from "./ids.validators";

export const getAllByRepairId = z.object({
  repairId,
});

export const getById = z.object({
  id: repairImageId,
});

export const create = z.object({
  caption: z.string().min(3),
  url: z.string().min(3),
  repairId,
});

export const update = z.object({
  id: repairImageId,
  caption: z.string().min(3),
  url: z.string().min(3),
});

export const archive = z.object({
  id: repairImageId,
});
