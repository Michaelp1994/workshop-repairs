import { and, count, eq, isNull } from "drizzle-orm";

import type { OrganizationID } from "../schemas/organization.schema";

import { getColumnFilterParams } from "../helpers/getColumnFilters";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { type Database, db } from "../index";
import {
  partFilterMapping,
  partOrderMapping,
} from "../mappings/parts.mappings";
import {
  type ArchivePart,
  type CreatePart,
  type PartID,
  parts,
  type UpdatePart,
} from "../schemas/parts.schema";

const globalFilterColumns = [parts.name];

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
    .from(parts)
    .where(
      and(
        isNull(parts.deletedAt),
        eq(parts.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    )
    .orderBy(...orderByParams, parts.id)
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
    .from(parts)
    .where(
      and(
        isNull(parts.deletedAt),
        eq(parts.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    );

  const [res] = await query.execute();
  return res?.count;
}

export async function getSelect(props: GetSelect, db: Database) {
  const query = db
    .select({
      value: parts.id,
      label: parts.name,
    })
    .from(parts)
    .orderBy(parts.id);
  const res = await query.execute();
  return res;
}

export async function getById(id: PartID, db: Database) {
  const query = db.select().from(parts).where(eq(parts.id, id));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreatePart, db: Database) {
  const query = db.insert(parts).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdatePart, db: Database) {
  const query = db
    .update(parts)
    .set(input)
    .where(eq(parts.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchivePart, db: Database) {
  const query = db
    .update(parts)
    .set(input)
    .where(eq(parts.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
