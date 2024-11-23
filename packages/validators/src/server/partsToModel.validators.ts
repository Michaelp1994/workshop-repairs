import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "../isomorphic/dataTables.validators";
import { modelId, partId } from "../isomorphic/ids.validators";

const partsByModelIdFilters = z.object({
  modelId,
});

export const getAllPartsByModelIdSchema = dataTableSchema.extend({
  filters: partsByModelIdFilters,
});
export type GetAllPartsByModelIdInput = z.infer<
  typeof getAllPartsByModelIdSchema
>;

export const countAllPartsByModelIdSchema = dataTableCountSchema.extend({
  filters: partsByModelIdFilters,
});

export type GetAllPartsByModelIdCountInput = z.infer<
  typeof countAllPartsByModelIdSchema
>;

/** */

const modelsByPartIdFilters = z.object({
  partId,
});

export const getAllModelsByPartIdSchema = dataTableSchema.extend({
  filters: modelsByPartIdFilters,
});
export type GetAllModelsByPartIdInput = z.infer<
  typeof getAllModelsByPartIdSchema
>;

export const countAllModelsByPartIdSchema = dataTableCountSchema.extend({
  filters: modelsByPartIdFilters,
});

export type GetAllModelsByPartIdCountInput = z.infer<
  typeof countAllModelsByPartIdSchema
>;

export const getModelsByPartIdSelectSchema = getSelectSchema.extend({
  partId,
});

export const getPartsByModelIdSelectSchema = getSelectSchema.extend({
  modelId,
});

/*** */

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
