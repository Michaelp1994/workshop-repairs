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
} from "../mappings/manufacturers.mapper";
import {
  type ArchiveManufacturer,
  type CreateManufacturer,
  type ManufacturerID,
  manufacturerTable,
  type UpdateManufacturer,
} from "../tables/manufacturer.sql";

export function getAll(
  { pagination, sorting, globalFilter, columnFilters }: GetAllInput,
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

export async function getCount(
  { globalFilter, columnFilters }: GetCountInput,
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

export async function getById(id: ManufacturerID) {
  const query = db
    .select()
    .from(manufacturerTable)
    .where(eq(manufacturerTable.id, id));
  const [res] = await query.execute();
  return res;
}

export async function getSelect(
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

export async function create(input: CreateManufacturer) {
  const query = db.insert(manufacturerTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateManufacturer) {
  const query = db
    .update(manufacturerTable)
    .set(input)
    .where(eq(manufacturerTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveManufacturer) {
  const query = db
    .update(manufacturerTable)
    .set(input)
    .where(eq(manufacturerTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
