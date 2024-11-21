import type {
  DataTableCountSchema,
  DataTableInput,
  GetSelectInput,
} from "@repo/validators/dataTables.validators";

import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";

import createMetadataFields from "../helpers/createMetadataFields";
import { db } from "../index";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/manufacturers.mapper";
import {
  type ArchiveManufacturer,
  type CreateManufacturer,
  type ManufacturerID,
  manufacturerTable,
  type UpdateManufacturer,
} from "../tables/manufacturer.sql";

const manufacturerFields = getTableColumns(manufacturerTable);

export function getAllManufacturers(
  { pagination, sorting, globalFilter, columnFilters }: DataTableInput,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const orderByParams = getOrderBy(sorting);

  const query = db
    .select()
    .from(manufacturerTable)
    .where(
      and(
        isNull(manufacturerTable.deletedAt),
        eq(manufacturerTable.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    )
    .orderBy(...orderByParams, manufacturerTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function countManufacturers(
  { globalFilter, columnFilters }: DataTableCountSchema,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);

  const query = db
    .select({ count: count() })
    .from(manufacturerTable)
    .where(
      and(
        isNull(manufacturerTable.deletedAt),
        eq(manufacturerTable.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    );

  const [res] = await query.execute();
  return res?.count;
}

export async function getManufacturerById(id: ManufacturerID) {
  const { metadata, createdByTable, deletedByTable, updatedByTable } =
    createMetadataFields();
  const query = db
    .select({
      ...manufacturerFields,
      ...metadata,
    })
    .from(manufacturerTable)
    .innerJoin(
      createdByTable,
      eq(manufacturerTable.createdById, createdByTable.id),
    )
    .leftJoin(
      updatedByTable,
      eq(manufacturerTable.updatedById, updatedByTable.id),
    )
    .leftJoin(
      deletedByTable,
      eq(manufacturerTable.deletedById, deletedByTable.id),
    )
    .where(eq(manufacturerTable.id, id));
  const [res] = await query.execute();
  return res;
}

export async function getManufacturersSelect(
  _: GetSelectInput,
  organizationId: OrganizationID,
) {
  const query = db
    .select({
      value: manufacturerTable.id,
      label: manufacturerTable.name,
    })
    .from(manufacturerTable)
    .where(
      and(
        isNull(manufacturerTable.deletedAt),
        eq(manufacturerTable.organizationId, organizationId),
      ),
    );
  return query.execute();
}

export async function createManufacturer(input: CreateManufacturer) {
  const query = db.insert(manufacturerTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateManufacturer(input: UpdateManufacturer) {
  const query = db
    .update(manufacturerTable)
    .set(input)
    .where(eq(manufacturerTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveManufacturer(input: ArchiveManufacturer) {
  const query = db
    .update(manufacturerTable)
    .set(input)
    .where(eq(manufacturerTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
