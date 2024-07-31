import { z } from "zod";
import { partId, repairId, repairPartId } from "./ids.validators";

const repairPartSchemas = {
  getAllByRepairId: z.object({
    id: repairId,
  }),
  getById: z.object({
    id: repairPartId,
  }),
  create: z.object({
    quantity: z.number(),
    installed: z.boolean(),
    repairId,
    partId,
  }),
  update: z.object({
    id: repairPartId,
    quantity: z.number(),
    installed: z.boolean(),
    partId,
  }),

  delete: z.object({
    id: repairPartId,
  }),
};

export default repairPartSchemas;
