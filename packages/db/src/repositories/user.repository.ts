import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.table";
import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  UpdateInput,
} from "../types";

import createMetadataFields from "../helpers/createMetadataFields";
import { type DatabaseTransaction } from "../index";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/users.mapper";
import { type UserID, type UserInput, userTable } from "../tables/user.table";
import { returnOne } from "../helpers/executeQuery";

const { password: _DANGEROUS_DO_NOT_EXPOSE_PASSWORD, ...publicUserColumns } =
  getTableColumns(userTable);

export default class UserRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<UserInput>,
    userId: UserID,
  ) {
    const query = tx
      .update(userTable)
      .set(input)
      .where(eq(userTable.id, userId))
      .returning({ ...publicUserColumns });
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
      .from(userTable)
      .where(
        and(
          isNull(userTable.deletedAt),
          eq(userTable.organizationId, organizationId),
          globalFilterParams,
          ...columnFilterParams,
        ),
      );
    const res = await returnOne(query);
    return res.count;
  }

  async create(tx: DatabaseTransaction, input: CreateInput<UserInput>) {
    const query = tx
      .insert(userTable)
      .values(input)
      .returning({ ...publicUserColumns });
    return await returnOne(query);
  }

  async getAll(
    tx: DatabaseTransaction,
    { globalFilter, sorting, pagination, columnFilters }: GetAllInput,
    organizationId: OrganizationID,
  ) {
    const orderByParams = getOrderBy(sorting);
    const globalFilterParams = getGlobalFilters(globalFilter);
    const columnFilterParams = getColumnFilters(columnFilters);
    const query = tx
      .select({ ...publicUserColumns })
      .from(userTable)
      .where(
        and(
          isNull(userTable.deletedAt),
          eq(userTable.organizationId, organizationId),
          globalFilterParams,
          ...columnFilterParams,
        ),
      )
      .orderBy(...orderByParams, userTable.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  }

  async getByEmail(tx: DatabaseTransaction, input: string) {
    const query = tx.select().from(userTable).where(eq(userTable.email, input));
    return await returnOne(query);
  }

  async getById(tx: DatabaseTransaction, input: UserID) {
    const { createdByTable, updatedByTable, deletedByTable, metadata } =
      createMetadataFields();
    const query = tx
      .select({ ...publicUserColumns, ...metadata })
      .from(userTable)
      .leftJoin(createdByTable, eq(userTable.createdById, createdByTable.id))
      .leftJoin(updatedByTable, eq(userTable.updatedById, updatedByTable.id))
      .leftJoin(deletedByTable, eq(userTable.deletedById, deletedByTable.id))
      .where(eq(userTable.id, input));
    return await returnOne(query);
  }

  async getSimpleById(tx: DatabaseTransaction, input: UserID) {
    const query = tx
      .select({
        organizationId: userTable.organizationId,
      })
      .from(userTable)
      .where(eq(userTable.id, input));
    return await returnOne(query);
  }

  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<UserInput>,
    userId: UserID,
  ) {
    const query = tx
      .update(userTable)
      .set(input)
      .where(eq(userTable.id, userId))
      .returning({ ...publicUserColumns });
    return await returnOne(query);
  }
}
