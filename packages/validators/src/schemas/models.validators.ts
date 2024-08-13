import { z } from "zod";

import {
  assetId,
  equipmentTypeId,
  manufacturerId,
  modelId,
} from "./ids.validators";

export const create = z.object({
  name: z.string().min(3),
  nickname: z.string().min(2),
  manufacturerId,
  equipmentTypeId,
});

export const update = z.object({
  id: modelId,
  name: z.string().min(3),
  manufacturerId,
  equipmentTypeId,
});

export const getById = z.object({
  id: modelId,
});

export const getByAssetId = z.object({
  assetId,
});

export const archive = z.object({
  id: modelId,
});
