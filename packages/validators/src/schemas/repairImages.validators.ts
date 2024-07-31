import { z } from "zod";

import { repairId, repairImageId } from "./ids.validators";

const repairImageColumns = z.enum(["url", "caption", "createdAt", "updatedAt"]);

export type RepairImageColumns = z.infer<typeof repairImageColumns>;

const repairImageSchemas = {
  getAllByRepairId: z.object({
    repairId,
  }),
  getById: z.object({
    id: repairImageId,
  }),
  create: z.object({
    caption: z.string().min(3),
    url: z.string().min(3),
    repairId,
  }),
  update: z.object({
    id: repairImageId,
    caption: z.string().min(3),
    url: z.string().min(3),
  }),

  delete: z.object({
    id: repairImageId,
  }),
};

export default repairImageSchemas;
