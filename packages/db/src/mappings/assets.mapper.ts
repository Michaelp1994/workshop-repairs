import { createColumnFilterFunction } from "../helpers/createColumnFilterFunction";
import { createGlobalFilterFunction } from "../helpers/createGlobalFilterFunction";
import { createOrderByFunction } from "../helpers/createOrderByFunction";
import { assetStatusTable } from "../tables/asset-status.sql";
import { assetTable } from "../tables/asset.sql";
import { locationTable } from "../tables/location.sql";
import { manufacturerTable } from "../tables/manufacturer.sql";
import { modelTable } from "../tables/model.sql";
import { FilterMapping, OrderMapping } from "../types";

const assetSortMapper: OrderMapping = {
  assetNumber: assetTable.assetNumber,
  serialNumber: assetTable.serialNumber,
  location_name: locationTable.name,
  manufacturer_name: manufacturerTable.name,
  model_nickname: modelTable.nickname,
  status_name: assetStatusTable.name,
  createdAt: assetTable.createdAt,
  updatedAt: assetTable.updatedAt,
};

const assetColumnFilterMapper: FilterMapping = {
  model_id: assetTable.modelId,
  client_id: assetTable.clientId,
  location_id: assetTable.locationId,
};

const assetGlobalFilterColumns = [
  assetTable.assetNumber,
  assetTable.serialNumber,
  locationTable.name,
  manufacturerTable.name,
  modelTable.name,
];

export const createGlobalFilters = createGlobalFilterFunction(
  assetGlobalFilterColumns,
);

export const createColumnFilters = createColumnFilterFunction(
  assetColumnFilterMapper,
);

export const createSortOrder = createOrderByFunction(assetSortMapper);
