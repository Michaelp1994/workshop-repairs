import { count, eq } from "drizzle-orm";
import type { DatabaseTransaction } from "..";
import { returnOne } from "../helpers/executeQuery";
import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  UpdateInput,
} from "../types";
import {
  permissionTable,
  type PermissionID,
  type PermissionInput,
} from "../tables/permission.table";

export default class PermissionRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<PermissionInput>,
    permissionId: PermissionID,
  ) {
    const query = tx
      .update(permissionTable)
      .set(input)
      .where(eq(permissionTable.id, permissionId))
      .returning();
    return await returnOne(query);
  }
  async getAll(tx: DatabaseTransaction, input: GetAllInput) {
    const query = tx.select().from(permissionTable);
    return await query.execute();
  }
  async getById(tx: DatabaseTransaction, input: GetAllInput) {
    const query = tx.select().from(permissionTable);
    return await returnOne(query);
  }
  async count(tx: DatabaseTransaction, input: CountInput) {
    const query = tx.select({ count: count() }).from(permissionTable);
    const res = await returnOne(query);
    return res.count;
  }
  async create(tx: DatabaseTransaction, input: CreateInput<PermissionInput>) {
    const query = tx.insert(permissionTable).values(input).returning();
    return await returnOne(query);
  }
  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<PermissionInput>,
    permissionId: PermissionID,
  ) {
    const query = tx
      .update(permissionTable)
      .set(input)
      .where(eq(permissionTable.id, permissionId))
      .returning();
    return await returnOne(query);
  }
}
