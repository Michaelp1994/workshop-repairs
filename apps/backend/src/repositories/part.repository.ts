import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.table";
import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "../types";

import createMetadataFields from "../helpers/createMetadataFields";
import { returnOne } from "../helpers/executeQuery";
import { type DatabaseTransaction } from "../db";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/parts.mapper";
import { type PartInput, partTable } from "../tables/part.table";

const partFields = getTableColumns(partTable);
export default class PartRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<PartInput>,
    localId: number,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(partTable)
      .set(input)
      .where(
        and(
          eq(partTable.localId, localId),
          eq(partTable.organizationId, organizationId),
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
      .from(partTable)
      .where(
        and(
          isNull(partTable.deletedAt),
          eq(partTable.organizationId, organizationId),
          globalFilterParams,
          ...columnFilterParams,
        ),
      );

    const res = await returnOne(query);
    return res.count;
  }

  async create(tx: DatabaseTransaction, input: CreateInput<PartInput>) {
    const query = tx.insert(partTable).values(input).returning();
    return await returnOne(query);
  }

  async getAll(
    tx: DatabaseTransaction,
    { pagination, globalFilter, sorting, columnFilters }: GetAllInput,
    organizationId: OrganizationID,
  ) {
    const globalFilterParams = getGlobalFilters(globalFilter);
    const columnFilterParams = getColumnFilters(columnFilters);
    const orderByParams = getOrderBy(sorting);
    const query = tx
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
    return await query.execute();
  }

  async getAllSimple(
    tx: DatabaseTransaction,
    _input: GetAllSimpleInput,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .select({
        value: partTable.localId,
        label: partTable.name,
      })
      .from(partTable)
      .where(
        and(
          isNull(partTable.deletedAt),
          eq(partTable.organizationId, organizationId),
        ),
      )
      .orderBy(partTable.id);
    const res = await query.execute();
    return res;
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
        ...partFields,
        ...metadata,
      })
      .from(partTable)
      .innerJoin(createdByTable, eq(partTable.createdById, createdByTable.id))
      .leftJoin(updatedByTable, eq(partTable.updatedById, updatedByTable.id))
      .leftJoin(deletedByTable, eq(partTable.deletedById, deletedByTable.id))
      .where(
        and(
          eq(partTable.localId, localId),
          eq(partTable.organizationId, organizationId),
        ),
      );
    return await returnOne(query);
  }

  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<PartInput>,
    localId: number,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(partTable)
      .set(input)
      .where(
        and(
          eq(partTable.localId, localId),
          eq(partTable.organizationId, organizationId),
        ),
      )
      .returning();
    return await returnOne(query);
  }
}
