import type {
  DataTableInput,
  DataTableCountSchema,
  GetSelectInput,
} from "@repo/validators/dataTables.validators";

import { and, count, eq, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";

import { db } from "../index";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/parts.mapper";
import {
  type ArchivePart,
  type CreatePart,
  type PartID,
  partTable,
  type UpdatePart,
} from "../tables/part.sql";

export function getAllParts(
  { pagination, globalFilter, sorting, columnFilters }: DataTableInput,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const orderByParams = getOrderBy(sorting);
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

export async function getPartsCount(
  { globalFilter, columnFilters }: DataTableCountSchema,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);

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

export async function getPartsSelect(_props: GetSelectInput) {
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

export async function getPartById(id: PartID) {
  const query = db.select().from(partTable).where(eq(partTable.id, id));
  const [res] = await query.execute();
  return res;
}

export async function createPart(input: CreatePart) {
  const query = db.insert(partTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updatePart(input: UpdatePart) {
  const query = db
    .update(partTable)
    .set(input)
    .where(eq(partTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archivePart(input: ArchivePart) {
  const query = db
    .update(partTable)
    .set(input)
    .where(eq(partTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
