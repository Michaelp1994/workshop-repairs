import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "../isomorphic/dataTables.validators";
import { modelId, modelImageId } from "../isomorphic/ids.validators";

const modelImageFilters = z.object({}).optional();

export const getAllModelImagesSchema = dataTableSchema.extend({
  filters: modelImageFilters,
});
export type GetAllModelImagesInput = z.infer<typeof getAllModelImagesSchema>;

export const countModelImagesSchema = dataTableCountSchema.extend({
  filters: modelImageFilters,
});
export type CountModelImagesInput = z.infer<typeof countModelImagesSchema>;

export const getModelImagesSelectSchema = getSelectSchema.extend({});

export type GetModelImagesSelectInput = z.infer<
  typeof getModelImagesSelectSchema
>;

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
