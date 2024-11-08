import { and, count, eq, isNull } from "drizzle-orm";

import type { OrganizationID } from "../schemas/organizations.schema";

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
  locations,
  type UpdateLocation,
} from "../schemas/locations.schema";

const globalFilterColumns = [locations.name];

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
    .from(locations)
    .where(
      and(
        isNull(locations.deletedAt),
        eq(locations.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    )
    .orderBy(...orderByParams, locations.id)
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
    .from(locations)
    .where(
      and(
        isNull(locations.deletedAt),
        eq(locations.organizationId, organizationId),
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
      value: locations.id,
      label: locations.name,
    })
    .from(locations)
    .where(
      and(
        isNull(locations.deletedAt),
        eq(locations.organizationId, organizationId),
      ),
    )
    .orderBy(locations.name);
  return query.execute();
}

export async function getById(id: LocationID) {
  const query = db.select().from(locations).where(eq(locations.id, id));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateLocation) {
  const query = db.insert(locations).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateLocation) {
  const query = db
    .update(locations)
    .set(input)
    .where(eq(locations.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveLocation) {
  const query = db
    .update(locations)
    .set(input)
    .where(eq(locations.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
