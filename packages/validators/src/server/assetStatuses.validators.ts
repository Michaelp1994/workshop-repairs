import { z } from "zod";

import { assetStatusId } from "../isomorphic/ids.validators";

export const createAssetStatusSchema = z.object({
  name: z.string().min(3),
});

export const updateAssetStatusSchema = z.object({
  id: assetStatusId,
  name: z.string().min(3),
});

export const getAssetStatusByIdSchema = z.object({
  id: assetStatusId,
});

export const archiveAssetStatusSchema = z.object({
  id: assetStatusId,
});
