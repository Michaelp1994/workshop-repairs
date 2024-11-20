import { z } from "zod";

import { modelId, partId } from "../isomorphic/ids.validators";

export const createPartToModelSchema = z.object({
  quantity: z.number().positive(),
  partId,
  modelId,
});

export const getPartToModelByIdSchema = z.object({
  partId,
  modelId,
});

export const updatePartToModelSchema = z.object({
  quantity: z.number().positive(),
  partId,
  modelId,
});

export const archivePartToModelSchema = z.object({
  partId,
  modelId,
});
