import type { ColumnFilters } from "@repo/validators/dataTables.validators";
import type { PgSelectBase, SelectedFields } from "drizzle-orm/pg-core";

import { and, eq, type SQL } from "drizzle-orm";

import { db } from "..";
import { createColumnFilterFunction } from "../helpers/createColumnFilterFunction";
import { createGlobalFilterFunction } from "../helpers/createGlobalFilterFunction";
import { createOrderByFunction } from "../helpers/createOrderByFunction";
import { assetTable } from "../tables/asset.sql";
import { assetStatusTable } from "../tables/asset-status.sql";
import { clientTable } from "../tables/client.sql";
import { locationTable } from "../tables/location.sql";
import { manufacturerTable } from "../tables/manufacturer.sql";
import { modelTable } from "../tables/model.sql";
import { modelImageTable } from "../tables/model-image.sql";
import { FilterMapping, OrderMapping } from "../types";

const assetOrderMapping: OrderMapping = {
  assetNumber: assetTable.assetNumber,
  serialNumber: assetTable.serialNumber,
  location_name: locationTable.name,
  manufacturer_name: manufacturerTable.name,
  model_nickname: modelTable.nickname,
  status_name: assetStatusTable.name,
  createdAt: assetTable.createdAt,
  updatedAt: assetTable.updatedAt,
};

const assetFilterMapping: FilterMapping = {
  model_id: assetTable.modelId,
  client_id: assetTable.clientId,
  location_id: assetTable.locationId,
};

const globalFilterColumns = [
  assetTable.assetNumber,
  assetTable.serialNumber,
  locationTable.name,
  manufacturerTable.name,
  modelTable.name,
];

export const getGlobalFilters = createGlobalFilterFunction(globalFilterColumns);

export const getColumnFilters = createColumnFilterFunction(assetFilterMapping);

export const getOrderBy = createOrderByFunction(assetOrderMapping);

export function createBaseQuery<T extends SelectedFields>(
  selectedFields: T,
  filters: SQL[],
  globalFilter: string,
  columnFilters: ColumnFilters,
) {
  const dynamicQuery = db.select(selectedFields).from(assetTable);

  //.from(assetTable).$dynamic();

  const query = dynamicQuery
    .innerJoin(locationTable, eq(assetTable.locationId, locationTable.id))
    .innerJoin(assetStatusTable, eq(assetTable.statusId, assetStatusTable.id))
    .innerJoin(modelTable, eq(assetTable.modelId, modelTable.id))
    .innerJoin(clientTable, eq(assetTable.clientId, clientTable.id))
    .innerJoin(
      manufacturerTable,
      eq(modelTable.manufacturerId, manufacturerTable.id),
    )
    .leftJoin(
      modelImageTable,
      eq(modelTable.defaultImageId, modelImageTable.id),
    )
    .where(
      and(
        ...filters,
        getGlobalFilters(globalFilter),
        ...getColumnFilters(columnFilters),
      ),
    );

  return query;
}
