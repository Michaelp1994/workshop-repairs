import type {
  DataTableCountOutput,
  DataTableOutput,
} from "@repo/validators/server/dataTables.validators";

import { and, count, eq, getTableColumns, type SQLWrapper } from "drizzle-orm";

import { db } from "..";
import { withPagination } from "../helpers/withPagination";
import {
  createColumnFilters,
  createGlobalFilters,
  createSortOrder,
} from "../mappings/assets.mapper";
import { assetStatusTable } from "../tables/asset-status.sql";
import { assetTable } from "../tables/asset.sql";
import { clientTable } from "../tables/client.sql";
import { locationTable } from "../tables/location.sql";
import { manufacturerTable } from "../tables/manufacturer.sql";
import { modelImageTable } from "../tables/model-image.sql";
import { modelTable } from "../tables/model.sql";

const assetFields = getTableColumns(assetTable);

export function createAllAssetsQuery(
  { globalFilter, sorting, columnFilters, pagination }: DataTableOutput,
  ...filters: (SQLWrapper | undefined)[]
) {
  const query = db
    .select({
      ...assetFields,
      location: locationTable,
      status: assetStatusTable,
      client: clientTable,
      model: {
        id: modelTable.id,
        name: modelTable.name,
        imageUrl: modelImageTable.url,
        manufacturer: manufacturerTable.name,
      },
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

export function createAssetsCountQuery(
  { globalFilter, columnFilters }: DataTableCountOutput,
  ...filters: (SQLWrapper | undefined)[]
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
