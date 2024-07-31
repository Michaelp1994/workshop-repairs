import { z } from "zod";

import { modelId, partId } from "./ids.validators";

const partsToModelsColumns = z.enum([
  "quantity",
  "part_name",
  "part_partNumber",
  "model_name",
]);

export type PartsToModelsColumns = z.infer<typeof partsToModelsColumns>;

const partsToModelsFilters = z.enum(["part_id", "model_id"]);

export type PartsToModelsFilters = z.infer<typeof partsToModelsFilters>;

const partsToModelSchemas = {
  create: z.object({
    quantity: z.number().positive(),
    partId,
    modelId,
  }),
  getById: z.object({
    partId,
    modelId,
  }),
  update: z.object({
    quantity: z.number().positive(),
    partId,
    modelId,
  }),
  delete: z.object({
    partId,
    modelId,
  }),
};

export default partsToModelSchemas;
