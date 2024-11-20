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
} from "../mappings/clients.mapper";
import {
  type ArchiveClient,
  type ClientID,
  clientTable,
  type CreateClient,
  type UpdateClient,
} from "../tables/client.sql";

export function getAll(
  { pagination, sorting, globalFilter, columnFilters }: GetAllInput,
  organizationId: OrganizationID,
) {
  const orderBys = getOrderBy(sorting);
  const globalFilters = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);

  const query = db
    .select()
    .from(clientTable)
    .where(
      and(
        isNull(clientTable.deletedAt),
        eq(clientTable.organizationId, organizationId),
        globalFilters,
        ...columnFilterParams,
      ),
    )
    .orderBy(...orderBys, clientTable.id)
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
    .from(clientTable)
    .where(
      and(
        isNull(clientTable.deletedAt),
        eq(clientTable.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    );
  const [res] = await query.execute();
  return res?.count;
}

export function getSelect(_: GetSelectInput, organizationId: OrganizationID) {
  const query = db
    .select({
      value: clientTable.id,
      label: clientTable.name,
    })
    .from(clientTable)
    .where(
      and(
        isNull(clientTable.deletedAt),
        eq(clientTable.organizationId, organizationId),
      ),
    )
    .orderBy(clientTable.name);
  return query.execute();
}

export async function getById(id: ClientID) {
  const query = db.select().from(clientTable).where(eq(clientTable.id, id));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateClient) {
  const query = db.insert(clientTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateClient) {
  const query = db
    .update(clientTable)
    .set(input)
    .where(eq(clientTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveClient) {
  const query = db
    .update(clientTable)
    .set(input)
    .where(eq(clientTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
