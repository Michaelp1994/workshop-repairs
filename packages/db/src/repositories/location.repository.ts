import type {
  CountLocationsInput,
  GetAllLocationsInput,
  GetLocationsSelectInput,
} from "@repo/validators/server/locations.validators";

import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";
import type { ArchiveInput, CreateInput, UpdateInput } from "../types";

import createMetadataFields from "../helpers/createMetadataFields";
import { type DatabaseTransaction } from "../index";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/locations.mapper";
import {
  type LocationInput,
  locationTable,
  type UpdateLocation,
} from "../tables/location.sql";

const locationFields = getTableColumns(locationTable);

export function getAllLocations(
  tx: DatabaseTransaction,
  { pagination, globalFilter, sorting, columnFilters }: GetAllLocationsInput,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const orderByParams = getOrderBy(sorting);
  const query = tx
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
  tx: DatabaseTransaction,
  { globalFilter, columnFilters }: CountLocationsInput,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);

  const query = tx
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
  tx: DatabaseTransaction,
  _: GetLocationsSelectInput,
  organizationId: OrganizationID,
) {
  const query = tx
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

export async function getLocationByLocalId(
  tx: DatabaseTransaction,
  localId: number,
  organizationId: OrganizationID,
) {
  const { metadata, createdByTable, deletedByTable, updatedByTable } =
    createMetadataFields();
  const query = tx
    .select({
      ...locationFields,
      ...metadata,
    })
    .from(locationTable)
    .innerJoin(createdByTable, eq(locationTable.createdById, createdByTable.id))
    .leftJoin(updatedByTable, eq(locationTable.updatedById, updatedByTable.id))
    .leftJoin(deletedByTable, eq(locationTable.deletedById, deletedByTable.id))
    .where(
      and(
        eq(locationTable.localId, localId),
        eq(locationTable.organizationId, organizationId),
      ),
    );
  const [res] = await query.execute();
  return res;
}

export async function createLocation(
  tx: DatabaseTransaction,
  input: CreateInput<LocationInput>,
) {
  const query = tx.insert(locationTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateLocation(
  tx: DatabaseTransaction,
  input: UpdateInput<LocationInput>,
  localId: number,
  organizationId: OrganizationID,
) {
  const query = tx
    .update(locationTable)
    .set(input)
    .where(
      and(
        eq(locationTable.localId, localId),
        eq(locationTable.organizationId, organizationId),
      ),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveLocation(
  tx: DatabaseTransaction,
  input: ArchiveInput<LocationInput>,
  localId: number,
  organizationId: OrganizationID,
) {
  const query = tx
    .update(locationTable)
    .set(input)
    .where(
      and(
        eq(locationTable.localId, localId),
        eq(locationTable.organizationId, organizationId),
      ),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}
