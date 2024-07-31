import { z } from "zod";

import { assetId, manufacturerId, modelId } from "./ids.validators";

const modelColumns = z.enum([
  "name",
  "nickname",
  "createdAt",
  "updatedAt",
  "manufacturer_name",
]);

export type ModelColumns = z.infer<typeof modelColumns>;

const modelFilters = z.enum(["manufacturer_id"]);

export type ModelFilters = z.infer<typeof modelFilters>;

const modelSchemas = {
  create: z.object({
    name: z.string().min(3),
    nickname: z.string().min(2),
    manufacturerId,
  }),
  update: z.object({
    id: modelId,
    name: z.string().min(3),
    manufacturerId,
  }),

  getById: z.object({
    id: modelId,
  }),
  getByAssetId: z.object({
    assetId,
  }),
  delete: z.object({
    id: modelId,
  }),
};

export default modelSchemas;
