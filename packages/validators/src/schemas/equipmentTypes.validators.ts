import { z } from "zod";

import { equipmentTypeId } from "./ids.validators";

export const create = z.object({
  name: z.string().min(3),
});

export const update = z.object({
  id: equipmentTypeId,
  name: z.string().min(3),
});

export const getById = z.object({
  id: equipmentTypeId,
});

export const archive = z.object({
  id: equipmentTypeId,
});
