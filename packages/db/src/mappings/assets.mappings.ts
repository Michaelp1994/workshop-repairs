import { assetTable } from "../schemas/asset.table";
import { assetStatusTable } from "../schemas/asset-status.table";
import { locationTable } from "../schemas/location.table";
import { manufacturerTable } from "../schemas/manufacturer.table";
import { modelTable } from "../schemas/model.table";
import { FilterMapping, OrderMapping } from "../types";

export const assetOrderMapping: OrderMapping = {
  assetNumber: assetTable.assetNumber,
  serialNumber: assetTable.serialNumber,
  location_name: locationTable.name,
  manufacturer_name: manufacturerTable.name,
  model_nickname: modelTable.nickname,
  status_name: assetStatusTable.name,
  createdAt: assetTable.createdAt,
  updatedAt: assetTable.updatedAt,
};

export const assetFilterMapping: FilterMapping = {
  model_id: assetTable.modelId,
  client_id: assetTable.clientId,
  location_id: assetTable.locationId,
};
