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
import { equipmentTypeTable } from "../tables/equipment-type.sql";
import { manufacturerTable } from "../tables/manufacturer.sql";
import { modelTable } from "../tables/model.sql";
import { modelImageTable } from "../tables/model-image.sql";

const orderMapping = {
  name: modelTable.name,
  nickname: modelTable.nickname,
  createdAt: modelTable.createdAt,
  updatedAt: modelTable.updatedAt,
  manufacturer_name: manufacturerTable.name,
};

const filterMapping = {
  manufacturer_id: manufacturerTable.id,
};

const globalFilterColumns = [
  modelTable.name,
  modelTable.nickname,
  manufacturerTable.name,
];

export const createGlobalFilters =
  createGlobalFilterFunction(globalFilterColumns);

export const createColumnFilters = createColumnFilterFunction(filterMapping);

export const createSortOrder = createOrderByFunction(orderMapping);

const modelFields = getTableColumns(modelTable);

export function createDataTableQuery(
  { pagination, globalFilter, sorting, columnFilters }: DataTableInput,
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

export function createCountQuery(
  { globalFilter, columnFilters }: DataTableCountSchema,
  ...filters: SQL[]
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
