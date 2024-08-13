import { z } from "zod";

import { modelId, modelImageId } from "./ids.validators";

export const create = z.object({
  caption: z.string().min(3),
  url: z.string().min(3),
  modelId,
});

export const uploadImage = z.object({
  caption: z.string().min(3),
  image: z.instanceof(File),
  modelId,
});

export const setFavourite = z.object({
  id: modelImageId,
});

export const update = z.object({
  id: modelImageId,
  caption: z.string().min(3),
  url: z.string().min(3),
});

export const getAllByModelId = z.object({
  modelId,
});

export const getById = z.object({
  id: modelImageId,
});

export const archive = z.object({
  id: modelImageId,
});
