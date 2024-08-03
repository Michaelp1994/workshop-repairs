import { z } from "zod";

import { repairStatusTypeId } from "./ids.validators";

export const create = z.object({
  name: z.string().min(3),
  colour: z.string().regex(/^#[A-Fa-f0-9]{6}$/),
});

export const update = z.object({
  id: repairStatusTypeId,
  name: z.string().min(3),
});

export const getById = z.object({
  id: repairStatusTypeId,
});

export const archive = z.object({
  id: repairStatusTypeId,
});
