import { z } from "zod";

import { manufacturerId } from "./ids.validators";

export const create = z.object({
  name: z.string().min(3),
});

export const update = z.object({
  id: manufacturerId,
  name: z.string().min(3),
});

export const getById = z.object({
  id: manufacturerId,
});

export const archive = z.object({
  id: manufacturerId,
});
