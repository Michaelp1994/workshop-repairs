import { count, eq, isNull } from "drizzle-orm";

import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "../types";

import { type DatabaseTransaction } from "..";
import {
  type UserTypeID,
  type UserTypeInput,
  userTypeTable,
} from "../tables/user-type.sql";

export default class UserTypeRepository {
  async archiveUserType(
    tx: DatabaseTransaction,
    input: ArchiveInput<UserTypeInput>,
    userTypeId: UserTypeID,
  ) {
    const query = tx
      .update(userTypeTable)
      .set(input)
      .where(eq(userTypeTable.id, userTypeId))
      .returning();
    const [res] = await query.execute();
    return res;
  }

  async countUserTypes(tx: DatabaseTransaction, _input: CountInput) {
    const query = tx
      .select({ count: count() })
      .from(userTypeTable)
      .where(isNull(userTypeTable.deletedAt));
    const [res] = await query.execute();
    return res?.count;
  }

  async createUserType(
    tx: DatabaseTransaction,
    input: CreateInput<UserTypeInput>,
  ) {
    const query = tx.insert(userTypeTable).values(input).returning();
    const [res] = await query.execute();
    return res;
  }

  async getAllUserTypes(tx: DatabaseTransaction, { pagination }: GetAllInput) {
    const query = tx
      .select()
      .from(userTypeTable)
      .where(isNull(userTypeTable.deletedAt))
      .orderBy(userTypeTable.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  }

  async getUserTypeById(tx: DatabaseTransaction, input: UserTypeID) {
    const query = tx
      .select()
      .from(userTypeTable)
      .where(eq(userTypeTable.id, input));
    const [res] = await query.execute();
    return res;
  }

  async getUserTypesSelect(tx: DatabaseTransaction, _input: GetAllSimpleInput) {
    const query = tx
      .select({
        value: userTypeTable.id,
        label: userTypeTable.name,
      })
      .from(userTypeTable)
      .where(isNull(userTypeTable.deletedAt));
    return query.execute();
  }

  async updateUserType(
    tx: DatabaseTransaction,
    input: UpdateInput<UserTypeInput>,
    userTypeId: UserTypeID,
  ) {
    const query = tx
      .update(userTypeTable)
      .set(input)
      .where(eq(userTypeTable.id, userTypeId))
      .returning();
    const [res] = await query.execute();
    return res;
  }
}
