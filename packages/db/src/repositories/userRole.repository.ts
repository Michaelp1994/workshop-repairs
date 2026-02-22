import { count, eq } from "drizzle-orm";

import type { DatabaseTransaction } from "..";
import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  UpdateInput,
} from "../types";

import { returnOne } from "../helpers/executeQuery";
import {
  type UserRoleID,
  type UserRoleInput,
  userRoleTable,
} from "../tables/userRole.table";

export default class UserRoleRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<UserRoleInput>,
    userRoleId: UserRoleID,
  ) {
    const query = tx
      .update(userRoleTable)
      .set(input)
      .where(eq(userRoleTable.id, userRoleId))
      .returning();
    return await returnOne(query);
  }
  async count(tx: DatabaseTransaction, input: CountInput) {
    const query = tx.select({ count: count() }).from(userRoleTable);
    const res = await returnOne(query);
    return res.count;
  }
  async create(tx: DatabaseTransaction, input: CreateInput<UserRoleInput>) {
    const query = tx.insert(userRoleTable).values(input).returning();
    return await returnOne(query);
  }
  async getAll(tx: DatabaseTransaction, input: GetAllInput) {
    const query = tx.select().from(userRoleTable);
    return await query.execute();
  }
  async getById(tx: DatabaseTransaction, input: GetAllInput) {
    const query = tx.select().from(userRoleTable);
    return await returnOne(query);
  }
  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<UserRoleInput>,
    userRoleId: UserRoleID,
  ) {
    const query = tx
      .update(userRoleTable)
      .set(input)
      .where(eq(userRoleTable.id, userRoleId))
      .returning();
    return await returnOne(query);
  }
}
