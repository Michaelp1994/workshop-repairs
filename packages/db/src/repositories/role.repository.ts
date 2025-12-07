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
import { roleTable, type RoleID, type RoleInput } from "../tables/role.table";

export default class RoleRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<RoleInput>,
    roleId: RoleID,
  ) {
    const query = tx
      .update(roleTable)
      .set(input)
      .where(eq(roleTable.id, roleId))
      .returning();
    return await returnOne(query);
  }
  async getAll(tx: DatabaseTransaction, input: GetAllInput) {
    const query = tx.select().from(roleTable);
    return await query.execute();
  }
  async getById(tx: DatabaseTransaction, input: GetAllInput) {
    const query = tx.select().from(roleTable);
    return await returnOne(query);
  }
  async count(tx: DatabaseTransaction, input: CountInput) {
    const query = tx.select({ count: count() }).from(roleTable);
    const res = await returnOne(query);
    return res.count;
  }
  async create(tx: DatabaseTransaction, input: CreateInput<RoleInput>) {
    const query = tx.insert(roleTable).values(input).returning();
    return await returnOne(query);
  }
  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<RoleInput>,
    roleId: RoleID,
  ) {
    const query = tx
      .update(roleTable)
      .set(input)
      .where(eq(roleTable.id, roleId))
      .returning();
    return await returnOne(query);
  }
}
