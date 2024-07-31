import { z } from "zod";

import replaceLineBreaks from "../helpers/replaceLineBreaks";
import { repairCommentId, repairId } from "./ids.validators";

const repairCommentColumns = z.enum(["comment", "createdAt", "updatedAt"]);

export type RepairCommentColumns = z.infer<typeof repairCommentColumns>;

const repairCommentSchemas = {
  getAllByRepairId: z.object({
    repairId,
  }),
  getById: z.object({
    id: repairCommentId,
  }),
  create: z.object({
    comment: z.preprocess(replaceLineBreaks, z.string().trim().min(4)),
    repairId,
  }),
  update: z.object({
    id: repairCommentId,
    comment: z.preprocess(replaceLineBreaks, z.string().trim().min(4)),
  }),
  delete: z.object({
    id: repairCommentId,
  }),
};

export default repairCommentSchemas;
