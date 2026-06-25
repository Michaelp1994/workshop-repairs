import { z } from "zod";

import {
  assetId,
  repairStatusTypeId,
  repairTypeId,
} from "../../../backend/src/validators/isomorphic/ids.validators";

export const repairFormSchema = z.object({
  fault: z.string().min(3),
  clientId: z.string().min(1),
  clientReference: z.string(),
  typeId: repairTypeId,
  statusId: repairStatusTypeId,
  assetId: z.string().min(1),
});

export type RepairFormInput = z.infer<typeof repairFormSchema>;

export const defaultRepair: RepairFormInput = {
  fault: "",
  clientReference: "",
  clientId: "",
  typeId: 0,
  statusId: 0,
  assetId: "",
};

export const repairSearchSchema = z.object({
  assetId: assetId.optional(),
});

export type RepairSearchParams = z.infer<typeof repairSearchSchema>;
