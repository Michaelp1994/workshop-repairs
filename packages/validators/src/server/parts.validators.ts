import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
} from "../isomorphic/dataTables.validators";
import { partId } from "../isomorphic/ids.validators";

const partFilters = z.object({}).optional();

export const getAllPartsSchema = dataTableSchema.extend({
  filters: partFilters,
});
export type GetAllPartsInput = z.infer<typeof getAllPartsSchema>;

export const getPartsCountSchema = dataTableCountSchema.extend({
  filters: partFilters,
});
export type GetPartsCountInput = z.infer<typeof getPartsCountSchema>;

export const createPartSchema = z.object({
  name: z.string().min(3),
  partNumber: z.string().min(3),
});

export const updatePartSchema = z.object({
  id: partId,
  name: z.string().min(3),
  partNumber: z.string().min(3),
});

export const getPartByIdSchema = z.object({
  id: partId,
});

export const archivePartSchema = z.object({
  id: partId,
});
