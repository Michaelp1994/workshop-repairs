import { z } from "zod";

import { partId } from "./ids.validators";

export const create = z.object({
  name: z.string().min(3),
  partNumber: z.string().min(3),
});

export const update = z.object({
  id: partId,
  name: z.string().min(3),
  partNumber: z.string().min(3),
});

export const getById = z.object({
  id: partId,
});

export const archive = z.object({
  id: partId,
});
