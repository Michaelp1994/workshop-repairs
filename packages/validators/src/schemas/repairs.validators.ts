import { z } from "zod";
import {
  assetId,
  clientId,
  repairId,
  repairStatusTypeId,
  repairTypeId,
} from "./ids.validators";

const repairSchemas = {
  create: z.object({
    fault: z.string().min(3),
    clientReference: z.string().min(3),
    clientId,
    typeId: repairTypeId,
    statusId: repairStatusTypeId,
    assetId,
  }),
  update: z.object({
    id: repairId,
    statusId: repairStatusTypeId,
    typeId: repairTypeId,
    clientId,
    fault: z.string().min(3),
    clientReference: z.string().min(3),
    assetId,
  }),
  getAllByAssetId: z.object({
    assetId,
  }),
  getById: z.object({
    id: repairId,
  }),
  delete: z.object({
    id: repairId,
  }),
};

export default repairSchemas;
