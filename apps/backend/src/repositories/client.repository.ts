import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.table";
import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "./types";

import { type DatabaseTransaction } from "../db";
import createMetadataFields from "../helpers/createMetadataFields";
import { returnOne } from "../helpers/executeQuery";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/clients.mapper";
import { type ClientInput, clientTable } from "../tables/client.table";

const clientFields = getTableColumns(clientTable);
export default class ClientRepository {
  async archive(
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
    return await returnOne(query);
  }

  async count(
    tx: DatabaseTransaction,
    { globalFilter, columnFilters }: CountInput,
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
    const res = await returnOne(query);
    return res.count;
  }

  async create(tx: DatabaseTransaction, input: CreateInput<ClientInput>) {
    const query = tx.insert(clientTable).values(input).returning();
    return await returnOne(query);
  }

  async getAll(
    tx: DatabaseTransaction,
    { pagination, sorting, globalFilter, columnFilters }: GetAllInput,
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
    return await query.execute();
  }

  async getAllSimple(
    tx: DatabaseTransaction,
    _input: GetAllSimpleInput,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .select({
        value: clientTable.localId,
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
    return await query.execute();
  }

  async getByLocalId(
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
    return await returnOne(query);
  }

  async update(
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
    return await returnOne(query);
  }
}
