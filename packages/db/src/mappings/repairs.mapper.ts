import { createColumnFilterFunction } from "../helpers/createColumnFilterFunction";
import { createGlobalFilterFunction } from "../helpers/createGlobalFilterFunction";
import { createOrderByFunction } from "../helpers/createOrderByFunction";
import { assetTable } from "../tables/asset.sql";
import { repairStatusTypeTable } from "../tables/repair-status-type.sql";
import { repairTypeTable } from "../tables/repair-type.sql";
import { repairTable } from "../tables/repair.sql";

const orderMapping = {
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

const filterMapping = {
  status: repairTable.statusId,
  asset_id: repairTable.assetId,
  client_id: repairTable.clientId,
};

const globalFilterColumns = [
  repairTable.fault,
  repairTable.summary,
  repairStatusTypeTable.name,
  repairTypeTable.name,
  assetTable.assetNumber,
  assetTable.serialNumber,
  repairTable.clientReference,
];

export const getGlobalFilters = createGlobalFilterFunction(globalFilterColumns);

export const getColumnFilters = createColumnFilterFunction(filterMapping);

export const getOrderBy = createOrderByFunction(orderMapping);
