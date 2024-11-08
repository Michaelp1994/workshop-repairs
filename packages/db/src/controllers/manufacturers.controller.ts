import { and, count, eq, isNull } from "drizzle-orm";

import type { OrganizationID } from "../schemas/organization.table";

import { getColumnFilterParams } from "../helpers/getColumnFilters";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { type Database, db } from "../index";
import {
  manufacturerFilterMapping,
  manufacturerOrderMapping,
} from "../mappings/manufacturers.mappings";
import {
  type ArchiveManufacturer,
  type CreateManufacturer,
  type ManufacturerID,
  manufacturerTable,
  type UpdateManufacturer,
} from "../schemas/manufacturer.table";

const globalFilterColumns = [manufacturerTable.name];

export function getAll(
  { pagination, sorting, globalFilter, columnFilters }: GetAll,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilterParams(
    globalFilter,
    globalFilterColumns,
  );
  const columnFilterParams = getColumnFilterParams(
    columnFilters,
    manufacturerFilterMapping,
  );
  const orderByParams = getOrderByParams(sorting, manufacturerOrderMapping);

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
  { globalFilter, columnFilters }: GetCount,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilterParams(
    globalFilter,
    globalFilterColumns,
  );
  const columnFilterParams = getColumnFilterParams(
    columnFilters,
    manufacturerFilterMapping,
  );

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

export async function getById(id: ManufacturerID, db: Database) {
  const query = db
    .select()
    .from(manufacturerTable)
    .where(eq(manufacturerTable.id, id));
  const [res] = await query.execute();
  return res;
}

export async function getSelect(_: GetSelect, organizationId: OrganizationID) {
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

export async function create(input: CreateManufacturer, db: Database) {
  const query = db.insert(manufacturerTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateManufacturer, db: Database) {
  const query = db
    .update(manufacturerTable)
    .set(input)
    .where(eq(manufacturerTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveManufacturer, db: Database) {
  const query = db
    .update(manufacturerTable)
    .set(input)
    .where(eq(manufacturerTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
