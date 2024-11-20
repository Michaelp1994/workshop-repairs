import type {
  DataTableInput,
  DataTableCountSchema,
} from "@repo/validators/dataTables.validators";

import { and, count, eq, getTableColumns, type SQL } from "drizzle-orm";

import { db } from "..";
import { createColumnFilterFunction } from "../helpers/createColumnFilterFunction";
import { createGlobalFilterFunction } from "../helpers/createGlobalFilterFunction";
import { createOrderByFunction } from "../helpers/createOrderByFunction";
import { withPagination } from "../helpers/withPagination";
import { assetTable } from "../tables/asset.sql";
import { assetStatusTable } from "../tables/asset-status.sql";
import { clientTable } from "../tables/client.sql";
import { locationTable } from "../tables/location.sql";
import { manufacturerTable } from "../tables/manufacturer.sql";
import { modelTable } from "../tables/model.sql";
import { modelImageTable } from "../tables/model-image.sql";
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

const assetFields = getTableColumns(assetTable);

export function createDataTableQuery(
  { globalFilter, sorting, columnFilters, pagination }: DataTableInput,
  ...filters: SQL[]
) {
  const query = db
    .select({
      ...assetFields,
      location: locationTable,
      status: assetStatusTable,
      client: clientTable,
      model: {
        id: modelTable.id,
        nickname: modelTable.nickname,
        imageUrl: modelImageTable.url,
      },
      manufacturer: manufacturerTable,
    })
    .from(assetTable)
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
        createGlobalFilters(globalFilter),
        ...createColumnFilters(columnFilters),
      ),
    )
    .orderBy(...createSortOrder(sorting), assetTable.id)
    .$dynamic();

  return withPagination(query, pagination);
}

export function createCountTableQuery(
  { globalFilter, columnFilters }: DataTableCountSchema,
  ...filters: SQL[]
) {
  const query = db
    .select({ count: count() })
    .from(assetTable)
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
        createGlobalFilters(globalFilter),
        ...createColumnFilters(columnFilters),
      ),
    );

  return query;
}
