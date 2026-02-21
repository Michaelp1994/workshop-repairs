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
  rolePermissionTable,
  type RolePermissionID,
  type RolePermissionInput,
} from "../tables/rolePermission.table";

export default class RolePermissionRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<RolePermissionInput>,
    rolePermissionId: RolePermissionID,
  ) {
    const query = tx
      .update(rolePermissionTable)
      .set(input)
      .where(eq(rolePermissionTable.id, rolePermissionId))
      .returning();
    return await returnOne(query);
  }
  async getAll(tx: DatabaseTransaction, input: GetAllInput) {
    const query = tx.select().from(rolePermissionTable);
    return await query.execute();
  }
  async getById(tx: DatabaseTransaction, input: GetAllInput) {
    const query = tx.select().from(rolePermissionTable);
    return await returnOne(query);
  }
  async count(tx: DatabaseTransaction, input: CountInput) {
    const query = tx.select({ count: count() }).from(rolePermissionTable);
    const res = await returnOne(query);
    return res.count;
  }
  async create(
    tx: DatabaseTransaction,
    input: CreateInput<RolePermissionInput>,
  ) {
    const query = tx.insert(rolePermissionTable).values(input).returning();
    return await returnOne(query);
  }
  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<RolePermissionInput>,
    rolePermissionId: RolePermissionID,
  ) {
    const query = tx
      .update(rolePermissionTable)
      .set(input)
      .where(eq(rolePermissionTable.id, rolePermissionId))
      .returning();
    return await returnOne(query);
  }
}
