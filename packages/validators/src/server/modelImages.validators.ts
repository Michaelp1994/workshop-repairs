import { z } from "zod";

import { modelId, modelImageId } from "../isomorphic/ids.validators";

export const createModelImageSchema = z.object({
  caption: z.string().min(3),
  url: z.string().min(3),
  modelId,
});

export const uploadModelImageSchema = z.object({
  caption: z.string().min(3),
  image: z.instanceof(File),
  modelId,
});

export const setFavouriteModelImageSchema = z.object({
  id: modelImageId,
});

export const updateModelImageSchema = z.object({
  id: modelImageId,
  caption: z.string().min(3),
  url: z.string().min(3),
});

export const getAllModelImagesByModelIdSchema = z.object({
  modelId,
});

export const getModelImageByIdSchema = z.object({
  id: modelImageId,
});

export const archiveModelImageSchema = z.object({
  id: modelImageId,
});
