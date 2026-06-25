import { createColumnFilterFunction } from "../helpers/createColumnFilterFunction";
import { createGlobalFilterFunction } from "../helpers/createGlobalFilterFunction";
import { createOrderByFunction } from "../helpers/createOrderByFunction";
import { assetTable } from "../tables/asset.table";
import { repairTable } from "../tables/repair.table";
import { repairStatusTypeTable } from "../tables/repairStatusType.table";
import { repairTypeTable } from "../tables/repairType.table";

const orderMapping = {
  id: repairTable.id,
  fault: repairTable.fault,
  summary: repairTable.summary,
  type_name: repairTypeTable.name,
  status_name: repairStatusTypeTable.name,
  assetNumber: assetTable.assetNumber,
  serialNumber: assetTable.serialNumber,
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
