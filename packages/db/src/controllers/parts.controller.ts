import { and, count, eq, isNull } from "drizzle-orm";

import type { OrganizationID } from "../schemas/organization.table";

import { getColumnFilterParams } from "../helpers/getColumnFilters";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { db } from "../index";
import {
  partFilterMapping,
  partOrderMapping,
} from "../mappings/parts.mappings";
import {
  type ArchivePart,
  type CreatePart,
  type PartID,
  partTable,
  type UpdatePart,
} from "../schemas/part.table";

const globalFilterColumns = [partTable.name];

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
    partFilterMapping,
  );
  const orderByParams = getOrderByParams(sorting, partOrderMapping);
  const query = db
    .select()
    .from(partTable)
    .where(
      and(
        isNull(partTable.deletedAt),
        eq(partTable.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    )
    .orderBy(...orderByParams, partTable.id)
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
    partFilterMapping,
  );

  const query = db
    .select({ count: count() })
    .from(partTable)
    .where(
      and(
        isNull(partTable.deletedAt),
        eq(partTable.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    );

  const [res] = await query.execute();
  return res?.count;
}

export async function getSelect(_props: GetSelect) {
  const query = db
    .select({
      value: partTable.id,
      label: partTable.name,
    })
    .from(partTable)
    .orderBy(partTable.id);
  const res = await query.execute();
  return res;
}

export async function getById(id: PartID) {
  const query = db.select().from(partTable).where(eq(partTable.id, id));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreatePart) {
  const query = db.insert(partTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdatePart) {
  const query = db
    .update(partTable)
    .set(input)
    .where(eq(partTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchivePart) {
  const query = db
    .update(partTable)
    .set(input)
    .where(eq(partTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
