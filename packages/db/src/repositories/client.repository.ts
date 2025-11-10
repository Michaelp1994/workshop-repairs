import type {
  CountClientsInput,
  GetAllClientsInput,
  GetClientSelectInput,
} from "@repo/validators/server/clients.validators";

import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";
import type { ArchiveInput, CreateInput, UpdateInput } from "../types";

import createMetadataFields from "../helpers/createMetadataFields";
import { type DatabaseTransaction } from "../index";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/clients.mapper";
import { type ClientInput, clientTable } from "../tables/client.sql";

const clientFields = getTableColumns(clientTable);

export function getAllClients(
  tx: DatabaseTransaction,
  { pagination, sorting, globalFilter, columnFilters }: GetAllClientsInput,
  organizationId: OrganizationID,
) {
  const orderBys = getOrderBy(sorting);
  const globalFilters = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);

  const query = tx
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

export async function countClients(
  tx: DatabaseTransaction,
  { globalFilter, columnFilters }: CountClientsInput,
  organizationId: OrganizationID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const query = tx
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
  tx: DatabaseTransaction,
  _: GetClientSelectInput,
  organizationId: OrganizationID,
) {
  const query = tx
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

export async function getClientByLocalId(
  tx: DatabaseTransaction,
  localId: number,
  organizationId: OrganizationID,
) {
  const { createdByTable, updatedByTable, deletedByTable, metadata } =
    createMetadataFields();
  const query = tx
    .select({
      ...clientFields,
      ...metadata,
    })
    .from(clientTable)
    .innerJoin(createdByTable, eq(clientTable.createdById, createdByTable.id))
    .leftJoin(updatedByTable, eq(clientTable.updatedById, updatedByTable.id))
    .leftJoin(deletedByTable, eq(clientTable.deletedById, deletedByTable.id))
    .where(
      and(
        eq(clientTable.localId, localId),
        eq(clientTable.organizationId, organizationId),
      ),
    );
  const [res] = await query.execute();
  return res;
}

export async function createClient(
  tx: DatabaseTransaction,
  input: CreateInput<ClientInput>,
) {
  const [client] = await tx.insert(clientTable).values(input).returning();

  return client;
}

export async function updateClient(
  tx: DatabaseTransaction,
  input: UpdateInput<ClientInput>,
  localId: number,
  organizationId: OrganizationID,
) {
  const query = tx
    .update(clientTable)
    .set(input)
    .where(
      and(
        eq(clientTable.localId, localId),
        eq(clientTable.organizationId, organizationId),
      ),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveClient(
  tx: DatabaseTransaction,
  input: ArchiveInput<ClientInput>,
  localId: number,
  organizationId: OrganizationID,
) {
  const query = tx
    .update(clientTable)
    .set(input)
    .where(
      and(
        eq(clientTable.localId, localId),
        eq(clientTable.organizationId, organizationId),
      ),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}
