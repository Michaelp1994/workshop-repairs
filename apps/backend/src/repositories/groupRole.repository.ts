import { count, eq } from "drizzle-orm";

import type { DatabaseTransaction } from "../db";
import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  UpdateInput,
} from "../types";

import { returnOne } from "../helpers/executeQuery";
import {
  type GroupRoleID,
  type GroupRoleInput,
  groupRoleTable,
} from "../tables/groupRole.table";

export default class GroupRoleRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<GroupRoleInput>,
    groupRoleId: GroupRoleID,
  ) {
    const query = tx
      .update(groupRoleTable)
      .set(input)
      .where(eq(groupRoleTable.id, groupRoleId))
      .returning();
    return await returnOne(query);
  }
  async count(tx: DatabaseTransaction, input: CountInput) {
    const query = tx.select({ count: count() }).from(groupRoleTable);
    const res = await returnOne(query);
    return res.count;
  }
  async create(tx: DatabaseTransaction, input: CreateInput<GroupRoleInput>) {
    const query = tx.insert(groupRoleTable).values(input).returning();
    return await returnOne(query);
  }
  async getAll(tx: DatabaseTransaction, input: GetAllInput) {
    const query = tx.select().from(groupRoleTable);
    return await query.execute();
  }
  async getById(tx: DatabaseTransaction, input: GetAllInput) {
    const query = tx.select().from(groupRoleTable);
    return await returnOne(query);
  }
  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<GroupRoleInput>,
    groupRoleId: GroupRoleID,
  ) {
    const query = tx
      .update(groupRoleTable)
      .set(input)
      .where(eq(groupRoleTable.id, groupRoleId))
      .returning();
    return await returnOne(query);
  }
}
