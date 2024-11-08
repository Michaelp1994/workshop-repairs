import { and, count, eq, isNull } from "drizzle-orm";

import type { OrganizationID } from "../schemas/organization.table";

import { getColumnFilterParams } from "../helpers/getColumnFilters";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { type Database, db } from "../index";
import {
  locationFilterMapping,
  locationOrderMapping,
} from "../mappings/locations.mappings";
import {
  type ArchiveLocation,
  type CreateLocation,
  type LocationID,
  locationTable,
  type UpdateLocation,
} from "../schemas/location.table";

const globalFilterColumns = [locationTable.name];

export function getAll(
  { pagination, globalFilter, sorting, columnFilters }: GetAll,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilterParams(
    globalFilter,
    globalFilterColumns,
  );
  const columnFilterParams = getColumnFilterParams(
    columnFilters,
    locationFilterMapping,
  );
  const orderByParams = getOrderByParams(sorting, locationOrderMapping);
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

export async function getCount(
  { globalFilter, columnFilters }: GetCount,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilterParams(
    globalFilter,
    globalFilterColumns,
  );
  const columnFilterParams = getColumnFilterParams(
    columnFilters,
    locationFilterMapping,
  );

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

export function getSelect(_: GetSelect, organizationId: OrganizationID) {
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

export async function getById(id: LocationID) {
  const query = db.select().from(locationTable).where(eq(locationTable.id, id));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateLocation) {
  const query = db.insert(locationTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateLocation) {
  const query = db
    .update(locationTable)
    .set(input)
    .where(eq(locationTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveLocation) {
  const query = db
    .update(locationTable)
    .set(input)
    .where(eq(locationTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
