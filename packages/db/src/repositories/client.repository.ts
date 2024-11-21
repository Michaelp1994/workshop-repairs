import type {
  DataTableCountSchema,
  DataTableInput,
  GetSelectInput,
} from "@repo/validators/dataTables.validators";

import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";

import createMetadataFields from "../helpers/createMetadataFields";
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

const clientFields = getTableColumns(clientTable);

export function getAllClients(
  { pagination, sorting, globalFilter, columnFilters }: DataTableInput,
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

export async function getClientsCount(
  { globalFilter, columnFilters }: DataTableCountSchema,
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

export function getClientsSelect(
  _: GetSelectInput,
  organizationId: OrganizationID,
) {
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

export async function getClientById(id: ClientID) {
  const { createdByTable, updatedByTable, deletedByTable, metadata } =
    createMetadataFields();
  const query = db
    .select({
      ...clientFields,
      ...metadata,
    })
    .from(clientTable)
    .innerJoin(createdByTable, eq(clientTable.createdById, createdByTable.id))
    .leftJoin(updatedByTable, eq(clientTable.updatedById, updatedByTable.id))
    .leftJoin(deletedByTable, eq(clientTable.deletedById, deletedByTable.id))
    .where(eq(clientTable.id, id));
  const [res] = await query.execute();
  return res;
}

export async function createClient(input: CreateClient) {
  const query = db.insert(clientTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateClient(input: UpdateClient) {
  const query = db
    .update(clientTable)
    .set(input)
    .where(eq(clientTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveClient(input: ArchiveClient) {
  const query = db
    .update(clientTable)
    .set(input)
    .where(eq(clientTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
