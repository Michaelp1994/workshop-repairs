import { eq, count } from "drizzle-orm";
import type { DatabaseTransaction } from "..";
import { returnOne } from "../helpers/executeQuery";
import {
  groupTable,
  type GroupID,
  type GroupInput,
} from "../tables/group.table";
import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  UpdateInput,
} from "../types";

export default class GroupRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<GroupInput>,
    groupId: GroupID,
  ) {
    const query = tx
      .update(groupTable)
      .set(input)
      .where(eq(groupTable.id, groupId))
      .returning();
    return await returnOne(query);
  }
  async getAll(tx: DatabaseTransaction, input: GetAllInput) {
    const query = tx.select().from(groupTable);
    return await query.execute();
  }
  async getById(tx: DatabaseTransaction, input: GetAllInput) {
    const query = tx.select().from(groupTable);
    return await returnOne(query);
  }
  async count(tx: DatabaseTransaction, input: CountInput) {
    const query = tx.select({ count: count() }).from(groupTable);
    const res = await returnOne(query);
    return res.count;
  }
  async create(tx: DatabaseTransaction, input: CreateInput<GroupInput>) {
    const query = tx.insert(groupTable).values(input).returning();
    return await returnOne(query);
  }
  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<GroupInput>,
    groupId: GroupID,
  ) {
    const query = tx
      .update(groupTable)
      .set(input)
      .where(eq(groupTable.id, groupId))
      .returning();
    return await returnOne(query);
  }
}
