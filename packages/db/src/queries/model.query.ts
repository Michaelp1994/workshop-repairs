import type {
  DataTableCountOutput,
  DataTableOutput,
} from "@repo/validators/server/dataTables.validators";

import { and, count, eq, getTableColumns, type SQL } from "drizzle-orm";

import { db } from "..";
import { withPagination } from "../helpers/withPagination";
import {
  createColumnFilters,
  createGlobalFilters,
  createSortOrder,
} from "../mappings/model.mapper";
import { equipmentTypeTable } from "../tables/equipment-type.sql";
import { manufacturerTable } from "../tables/manufacturer.sql";
import { modelImageTable } from "../tables/model-image.sql";
import { modelTable } from "../tables/model.sql";

const modelFields = getTableColumns(modelTable);

export function createAllModelsQuery(
  { pagination, globalFilter, sorting, columnFilters }: DataTableOutput,
  ...filters: (SQL | undefined)[]
) {
  const globalFilterParams = createGlobalFilters(globalFilter);
  const columnFilterParams = createColumnFilters(columnFilters);
  const orderByParams = createSortOrder(sorting);

  const query = db
    .select({
      ...modelFields,
      defaultImageUrl: modelImageTable.url,
      equipmentType: equipmentTypeTable,
      manufacturer: manufacturerTable,
    })
    .from(modelTable)
    .innerJoin(
      manufacturerTable,
      eq(modelTable.manufacturerId, manufacturerTable.id),
    )
    .innerJoin(
      equipmentTypeTable,
      eq(modelTable.equipmentTypeId, equipmentTypeTable.id),
    )
    .leftJoin(
      modelImageTable,
      eq(modelTable.defaultImageId, modelImageTable.id),
    )
    .where(and(...filters, globalFilterParams, ...columnFilterParams))
    .orderBy(...orderByParams, modelTable.id)
    .$dynamic();

  return withPagination(query, pagination);
}

export function createModelsCountQuery(
  { globalFilter, columnFilters }: DataTableCountOutput,
  ...filters: (SQL | undefined)[]
) {
  const globalFilterParams = createGlobalFilters(globalFilter);
  const columnFilterParams = createColumnFilters(columnFilters);
  const query = db
    .select({ count: count() })
    .from(modelTable)
    .leftJoin(
      manufacturerTable,
      eq(modelTable.manufacturerId, manufacturerTable.id),
    )
    .innerJoin(
      equipmentTypeTable,
      eq(modelTable.equipmentTypeId, equipmentTypeTable.id),
    )
    .where(and(...filters, globalFilterParams, ...columnFilterParams));

  return query;
}
