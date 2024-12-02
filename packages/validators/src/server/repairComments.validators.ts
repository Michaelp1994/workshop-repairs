import { z } from "zod";

import replaceLineBreaks from "../helpers/replaceLineBreaks";
import { repairCommentId, repairId } from "../isomorphic/ids.validators";
import { dataTableCountSchema, dataTableSchema } from "./dataTables.validators";

const repairCommentFilters = z.object({}).optional();

export const getAllRepairCommentsSchema = dataTableSchema.extend({
  filters: repairCommentFilters,
});
export type GetAllRepairCommentsInput = z.infer<
  typeof getAllRepairCommentsSchema
>;

export const countRepairCommentsSchema = dataTableCountSchema.extend({
  filters: repairCommentFilters,
});
export type CountRepairCommentsInput = z.infer<
  typeof countRepairCommentsSchema
>;

export const getAllRepairCommentsByRepairIdSchema = z.object({
  repairId,
});

export const getRepairCommentByIdSchema = z.object({
  id: repairCommentId,
});

export const createRepairCommentSchema = z.object({
  comment: z.preprocess(replaceLineBreaks, z.string().trim().min(4)),
  repairId,
});

export const updateRepairCommentSchema = z.object({
  id: repairCommentId,
  comment: z.preprocess(replaceLineBreaks, z.string().trim().min(4)),
});

export const archiveRepairCommentSchema = z.object({
  id: repairCommentId,
});
