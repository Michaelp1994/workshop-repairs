import type {
  DataTableCountSchema,
  DataTableOutput,
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
} from "../mappings/locations.mapper";
import {
  type ArchiveLocation,
  type CreateLocation,
  type LocationID,
  locationTable,
  type UpdateLocation,
} from "../tables/location.sql";

const locationFields = getTableColumns(locationTable);

export function getAllLocations(
  { pagination, globalFilter, sorting, columnFilters }: DataTableOutput,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const orderByParams = getOrderBy(sorting);
  const query = db
    .select()
    .from(locationTable)
    .where(
      and(
        isNull(locationTable.deletedAt),
        eq(locationTable.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    )
    .orderBy(...orderByParams, locationTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function countLocations(
  { globalFilter, columnFilters }: DataTableCountSchema,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);

  const query = db
    .select({ count: count() })
    .from(locationTable)
    .where(
      and(
        isNull(locationTable.deletedAt),
        eq(locationTable.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    );

  const [res] = await query.execute();
  return res?.count;
}

export function getLocationsSelect(
  _: GetSelectInput,
  organizationId: OrganizationID,
) {
  const query = db
    .select({
      value: locationTable.id,
      label: locationTable.name,
    })
    .from(locationTable)
    .where(
      and(
        isNull(locationTable.deletedAt),
        eq(locationTable.organizationId, organizationId),
      ),
    )
    .orderBy(locationTable.name);
  return query.execute();
}

export async function getLocationById(id: LocationID) {
  const { metadata, createdByTable, deletedByTable, updatedByTable } =
    createMetadataFields();
  const query = db
    .select({
      ...locationFields,
      ...metadata,
    })
    .from(locationTable)
    .innerJoin(createdByTable, eq(locationTable.createdById, createdByTable.id))
    .leftJoin(updatedByTable, eq(locationTable.updatedById, updatedByTable.id))
    .leftJoin(deletedByTable, eq(locationTable.deletedById, deletedByTable.id))
    .where(eq(locationTable.id, id));
  const [res] = await query.execute();
  return res;
}

export async function createLocation(input: CreateLocation) {
  const query = db.insert(locationTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateLocation(input: UpdateLocation) {
  const query = db
    .update(locationTable)
    .set(input)
    .where(eq(locationTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveLocation(input: ArchiveLocation) {
  const query = db
    .update(locationTable)
    .set(input)
    .where(eq(locationTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
