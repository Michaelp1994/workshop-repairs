import { z } from "zod";

import { repairTypeId } from "./ids.validators";

export const create = z.object({
  name: z.string().min(3),
});

export const update = z.object({
  id: repairTypeId,
  name: z.string().min(3),
});

export const getById = z.object({
  id: repairTypeId,
});

export const archive = z.object({
  id: repairTypeId,
});
