import { z } from "zod";

import replaceLineBreaks from "../helpers/replaceLineBreaks";
import { repairCommentId, repairId } from "./ids.validators";

export const getAllByRepairId = z.object({
  repairId,
});

export const getById = z.object({
  id: repairCommentId,
});

export const create = z.object({
  comment: z.preprocess(replaceLineBreaks, z.string().trim().min(4)),
  repairId,
});

export const update = z.object({
  id: repairCommentId,
  comment: z.preprocess(replaceLineBreaks, z.string().trim().min(4)),
});

export const archive = z.object({
  id: repairCommentId,
});
