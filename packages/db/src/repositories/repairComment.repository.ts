import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { DatabaseTransaction } from "..";
import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  UpdateInput,
} from "../types";

import {
  type RepairCommentID,
  type RepairCommentInput,
  repairCommentTable,
} from "../tables/repair-comment.sql";
import { type RepairID } from "../tables/repair.sql";
import { userTable } from "../tables/user.sql";

const repairCommentFields = getTableColumns(repairCommentTable);

export default class RepairCommentRepository {
  async archiveRepairComment(
    tx: DatabaseTransaction,
    input: ArchiveInput<RepairCommentInput>,
    repairCommentId: RepairCommentID,
  ) {
    const query = tx
      .update(repairCommentTable)
      .set(input)
      .where(eq(repairCommentTable.id, repairCommentId))
      .returning();
    const [res] = await query.execute();
    return res;
  }

  async countRepairComments(tx: DatabaseTransaction, _input: CountInput) {
    const query = tx
      .select({ count: count() })
      .from(repairCommentTable)
      .where(isNull(repairCommentTable.deletedAt));
    const [res] = await query.execute();
    return res?.count;
  }

  async createRepairComment(
    tx: DatabaseTransaction,
    input: CreateInput<RepairCommentInput>,
  ) {
    const query = tx.insert(repairCommentTable).values(input).returning();
    const [res] = await query.execute();
    return res;
  }

  async getAllRepairComments(
    tx: DatabaseTransaction,
    { pagination }: GetAllInput,
  ) {
    const query = tx
      .select()
      .from(repairCommentTable)
      .where(isNull(repairCommentTable.deletedAt))
      .orderBy(repairCommentTable.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  }

  async getAllRepairCommentsByRepairId(
    tx: DatabaseTransaction,
    input: RepairID,
  ) {
    const query = tx
      .select({
        ...repairCommentFields,
        createdBy: {
          id: userTable.id,
          firstName: userTable.firstName,
          lastName: userTable.lastName,
        },
      })
      .from(repairCommentTable)
      .innerJoin(userTable, eq(repairCommentTable.createdById, userTable.id))
      .where(
        and(
          isNull(repairCommentTable.deletedAt),
          eq(repairCommentTable.repairId, input),
        ),
      )
      .orderBy(repairCommentTable.createdAt);
    const res = await query.execute();
    return res;
  }

  async getRepairCommentById(tx: DatabaseTransaction, input: RepairCommentID) {
    const query = tx
      .select()
      .from(repairCommentTable)
      .where(eq(repairCommentTable.id, input));

    const [res] = await query.execute();
    return res;
  }

  async updateRepairComment(
    tx: DatabaseTransaction,
    input: UpdateInput<RepairCommentInput>,
    repairCommentId: RepairCommentID,
  ) {
    const query = tx
      .update(repairCommentTable)
      .set(input)
      .where(eq(repairCommentTable.id, repairCommentId))
      .returning();
    const [res] = await query.execute();
    return res;
  }
}
