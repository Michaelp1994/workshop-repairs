import { assets } from "../schemas/assets.schema";
import { repairStatusTypes } from "../schemas/repair-status-types.schema";
import { repairTypes } from "../schemas/repair-types.schema";
import { repairs } from "../schemas/repairs.schema";
import { FilterMapping } from "../types";

export const repairOrderMapping = {
  fault: repairs.fault,
  summary: repairs.summary,
  type_name: repairTypes.name,
  status_name: repairStatusTypes.name,
  asset_assetNumber: assets.assetNumber,
  asset_serialNumber: assets.serialNumber,
  clientReference: repairs.clientReference,
  createdAt: repairs.createdAt,
  updatedAt: repairs.updatedAt,
};

export const repairFilterMapping: FilterMapping = {
  status: repairs.statusId,
  asset_id: repairs.assetId,
};
