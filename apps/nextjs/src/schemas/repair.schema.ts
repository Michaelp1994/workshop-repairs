import { z } from "zod";
import {
  assetId,
  clientId,
  repairStatusTypeId,
  repairTypeId,
} from "@repo/validators/ids.validators";

export const repairFormSchema = z.object({
  fault: z.string().min(3),
  clientId: clientId,
  clientReference: z.string(),
  typeId: repairTypeId,
  statusId: repairStatusTypeId,
  assetId,
});

export type RepairFormInput = z.infer<typeof repairFormSchema>;

export const defaultRepair: RepairFormInput = {
  fault: "",
  clientReference: "",
  clientId: 0,
  typeId: 0,
  statusId: 0,
  assetId: 0,
};

export const repairSearchSchema = z.object({
  assetId: assetId.optional(),
});

export type RepairSearchParams = z.infer<typeof repairSearchSchema>;
