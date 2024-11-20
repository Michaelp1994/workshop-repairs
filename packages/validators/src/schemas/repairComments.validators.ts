import { z } from "zod";

import replaceLineBreaks from "../helpers/replaceLineBreaks";
import { repairCommentId, repairId } from "./ids.validators";

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
