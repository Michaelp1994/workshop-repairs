import { z } from "zod";

import { repairTypeId } from "./ids.validators";

const repairTypeColumns = z.enum(["name", "createdAt", "updatedAt"]);

export type RepairTypeColumns = z.infer<typeof repairTypeColumns>;

const repairTypeSchemas = {
  create: z.object({
    name: z.string().min(3),
  }),
  update: z.object({
    id: repairTypeId,
    name: z.string().min(3),
  }),
  getById: z.object({
    id: repairTypeId,
  }),
  archive: z.object({
    id: repairTypeId,
  }),
};

export default repairTypeSchemas;
