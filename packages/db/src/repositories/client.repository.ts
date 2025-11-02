import type {
  CountClientsInput,
  GetAllClientsInput,
  GetClientSelectInput,
} from "@repo/validators/server/clients.validators";

import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";

import createMetadataFields from "../helpers/createMetadataFields";
import { getNextSequenceValue } from "../helpers/getNextSequenceValue";
import { db } from "../index";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/clients.mapper";
import {
  type ArchiveClient,
  clientTable,
  type CreateClient,
  type UpdateClient,
} from "../tables/client.sql";

const clientFields = getTableColumns(clientTable);

export function getAllClients(
  { pagination, sorting, globalFilter, columnFilters }: GetAllClientsInput,
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

export async function countClients(
  { globalFilter, columnFilters }: CountClientsInput,
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
  _: GetClientSelectInput,
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

export async function getClientByLocalId(
  localId: number,
  organizationId: OrganizationID,
) {
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
    .where(
      and(
        eq(clientTable.localId, localId),
        eq(clientTable.organizationId, organizationId),
      ),
    );
  const [res] = await query.execute();
  return res;
}

export async function createClient(input: CreateClient) {
  return await db.transaction(async (tx) => {
    const localId = await getNextSequenceValue(
      tx,
      input.organizationId,
      "client",
    );

    const [result] = await tx
      .insert(clientTable)
      .values({ ...input, localId })
      .returning();

    return result;
  });
}

export async function updateClient(
  input: UpdateClient,
  organizationId: OrganizationID,
) {
  const query = db
    .update(clientTable)
    .set(input)
    .where(
      and(
        eq(clientTable.localId, input.localId),
        eq(clientTable.organizationId, organizationId),
      ),
    )
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
