import { and, count, eq, isNull } from "drizzle-orm";

import type { OrganizationID } from "../schemas/organizations.schema";

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
  clients,
  type CreateClient,
  type UpdateClient,
} from "../schemas/clients.schema";

const globalFilterColumns = [clients.name];

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
    .from(clients)
    .where(
      and(
        isNull(clients.deletedAt),
        eq(clients.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    )
    .orderBy(...orderByParams, clients.id)
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
    .from(clients)
    .where(
      and(
        isNull(clients.deletedAt),
        eq(clients.organizationId, organizationId),
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
      value: clients.id,
      label: clients.name,
    })
    .from(clients)
    .where(
      and(
        isNull(clients.deletedAt),
        eq(clients.organizationId, organizationId),
      ),
    )
    .orderBy(clients.name);
  return query.execute();
}

export async function getById(id: ClientID, db: Database) {
  const query = db.select().from(clients).where(eq(clients.id, id));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateClient, db: Database) {
  const query = db.insert(clients).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateClient, db: Database) {
  const query = db
    .update(clients)
    .set(input)
    .where(eq(clients.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveClient, db: Database) {
  const query = db
    .update(clients)
    .set(input)
    .where(eq(clients.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
