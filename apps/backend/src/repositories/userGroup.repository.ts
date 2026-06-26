import { count, eq } from "drizzle-orm";

import type { DatabaseTransaction } from "../db";
import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  UpdateInput,
} from "./types";

import { returnOne } from "../helpers/executeQuery";
import {
  type UserGroupID,
  type UserGroupInput,
  userGroupTable,
} from "../tables/userGroup.table";

export default class UserGroupRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<UserGroupInput>,
    userGroupId: UserGroupID,
  ) {
    const query = tx
      .update(userGroupTable)
      .set(input)
      .where(eq(userGroupTable.id, userGroupId))
      .returning();
    return await returnOne(query);
  }
  async count(tx: DatabaseTransaction, input: CountInput) {
    const query = tx.select({ count: count() }).from(userGroupTable);
    const res = await returnOne(query);
    return res.count;
  }
  async create(tx: DatabaseTransaction, input: CreateInput<UserGroupInput>) {
    const query = tx.insert(userGroupTable).values(input).returning();
    return await returnOne(query);
  }
  async getAll(tx: DatabaseTransaction, input: GetAllInput) {
    const query = tx.select().from(userGroupTable);
    return await query.execute();
  }
  async getById(tx: DatabaseTransaction, input: GetAllInput) {
    const query = tx.select().from(userGroupTable);
    return await returnOne(query);
  }
  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<UserGroupInput>,
    userGroupId: UserGroupID,
  ) {
    const query = tx
      .update(userGroupTable)
      .set(input)
      .where(eq(userGroupTable.id, userGroupId))
      .returning();
    return await returnOne(query);
  }
}
