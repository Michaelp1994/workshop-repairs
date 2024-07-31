import { z } from "zod";
import { modelImageId, modelId } from "./ids.validators";

const modelImageColumns = z.enum(["url", "caption", "createdAt", "updatedAt"]);

export type ModelImageColumns = z.infer<typeof modelImageColumns>;

const modelImageSchemas = {
  create: z.object({
    caption: z.string().min(3),
    url: z.string().min(3),
    modelId,
  }),
  setFavourite: z.object({
    id: modelImageId,
  }),
  update: z.object({
    id: modelImageId,
    caption: z.string().min(3),
    url: z.string().min(3),
  }),
  getAllByModelId: z.object({
    modelId,
  }),
  getById: z.object({
    id: modelImageId,
  }),
  delete: z.object({
    id: modelImageId,
  }),
};

export default modelImageSchemas;
