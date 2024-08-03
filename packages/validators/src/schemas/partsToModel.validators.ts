import { z } from "zod";

import { modelId, partId } from "./ids.validators";

export const create = z.object({
  quantity: z.number().positive(),
  partId,
  modelId,
});

export const getById = z.object({
  partId,
  modelId,
});

export const update = z.object({
  quantity: z.number().positive(),
  partId,
  modelId,
});

export const archive = z.object({
  partId,
  modelId,
});
