import { assetTable } from "../schemas/asset.table";
import { repairTable } from "../schemas/repair.table";
import { repairStatusTypeTable } from "../schemas/repair-status-type.table";
import { repairTypeTable } from "../schemas/repair-type.table";
import { FilterMapping } from "../types";

export const repairOrderMapping = {
  fault: repairTable.fault,
  summary: repairTable.summary,
  type_name: repairTypeTable.name,
  status_name: repairStatusTypeTable.name,
  asset_assetNumber: assetTable.assetNumber,
  asset_serialNumber: assetTable.serialNumber,
  clientReference: repairTable.clientReference,
  createdAt: repairTable.createdAt,
  updatedAt: repairTable.updatedAt,
};

export const repairFilterMapping: FilterMapping = {
  status: repairTable.statusId,
  asset_id: repairTable.assetId,
  client_id: repairTable.clientId,
};
