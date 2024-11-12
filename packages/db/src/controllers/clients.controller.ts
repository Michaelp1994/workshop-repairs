import { and, count, eq, isNull } from "drizzle-orm";

import type { OrganizationID } from "../schemas/organization.table";

import { getColumnFilterParams } from "../helpers/getColumnFilters";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { type Database, db } from "../index";
import {
  clientFilterMapping,
  clientOrderMapping,
} from "../mappings/clients.mappings";
import {
  type ArchiveClient,
  type ClientID,
  clientTable,
  type CreateClient,
  type UpdateClient,
} from "../schemas/client.table";

const globalFilterColumns = [clientTable.name];

export function getAll(
  { pagination, sorting, globalFilter, columnFilters }: GetAll,
  organizationId: OrganizationID,
) {
  const orderByParams = getOrderByParams(sorting, clientOrderMapping);
  const globalFilterParams = getGlobalFilterParams(
    globalFilter,
    globalFilterColumns,
  );
  const columnFilterParams = getColumnFilterParams(
    columnFilters,
    clientFilterMapping,
  );

  const query = db
    .select()
    .from(clientTable)
    .where(
      and(
        isNull(clientTable.deletedAt),
        eq(clientTable.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    )
    .orderBy(...orderByParams, clientTable.id)
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
    clientFilterMapping,
  );
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

export function getSelect(_: GetSelect, organizationId: OrganizationID) {
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

export async function getById(id: ClientID, db: Database) {
  const query = db.select().from(clientTable).where(eq(clientTable.id, id));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateClient, db: Database) {
  const query = db.insert(clientTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateClient, db: Database) {
  const query = db
    .update(clientTable)
    .set(input)
    .where(eq(clientTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveClient, db: Database) {
  const query = db
    .update(clientTable)
    .set(input)
    .where(eq(clientTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
