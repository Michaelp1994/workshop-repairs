import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { DatabaseTransaction } from "../db";
import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  UpdateInput,
} from "../types";

import { returnOne } from "../helpers/executeQuery";
import { type RepairID } from "../tables/repair.table";
import {
  type RepairCommentID,
  type RepairCommentInput,
  repairCommentTable,
} from "../tables/repairComment.table";
import { userTable } from "../tables/user.table";

const repairCommentFields = getTableColumns(repairCommentTable);

export default class RepairCommentRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<RepairCommentInput>,
    repairCommentId: RepairCommentID,
  ) {
    const query = tx
      .update(repairCommentTable)
      .set(input)
      .where(eq(repairCommentTable.id, repairCommentId))
      .returning();
    return await returnOne(query);
  }

  async count(tx: DatabaseTransaction, _input: CountInput) {
    const query = tx
      .select({ count: count() })
      .from(repairCommentTable)
      .where(isNull(repairCommentTable.deletedAt));
    const res = await returnOne(query);
    return res.count;
  }

  async create(
    tx: DatabaseTransaction,
    input: CreateInput<RepairCommentInput>,
  ) {
    const query = tx.insert(repairCommentTable).values(input).returning();
    return await returnOne(query);
  }

  async getAll(tx: DatabaseTransaction, { pagination }: GetAllInput) {
    const query = tx
      .select()
      .from(repairCommentTable)
      .where(isNull(repairCommentTable.deletedAt))
      .orderBy(repairCommentTable.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  }

  async getAllByRepairId(tx: DatabaseTransaction, input: RepairID) {
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

  async getById(tx: DatabaseTransaction, input: RepairCommentID) {
    const query = tx
      .select()
      .from(repairCommentTable)
      .where(eq(repairCommentTable.id, input));

    return await returnOne(query);
  }

  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<RepairCommentInput>,
    repairCommentId: RepairCommentID,
  ) {
    const query = tx
      .update(repairCommentTable)
      .set(input)
      .where(eq(repairCommentTable.id, repairCommentId))
      .returning();
    return await returnOne(query);
  }
}
