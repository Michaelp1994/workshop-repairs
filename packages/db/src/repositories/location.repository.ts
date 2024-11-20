import type {
  GetAllInput,
  GetCountInput,
  GetSelectInput,
} from "@repo/validators/dataTables.validators";

import { and, count, eq, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";

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

export function getAllLocations(
  { pagination, globalFilter, sorting, columnFilters }: GetAllInput,
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

export async function getLocationsCount(
  { globalFilter, columnFilters }: GetCountInput,
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
  const query = db.select().from(locationTable).where(eq(locationTable.id, id));
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
