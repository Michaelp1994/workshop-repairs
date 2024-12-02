import type {
  DataTableCountOutput,
  DataTableOutput,
} from "@repo/validators/server/dataTables.validators";

import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import { db } from "..";
import {
  type ArchiveRepairComment,
  type CreateRepairComment,
  type RepairCommentID,
  repairCommentTable,
  type UpdateRepairComment,
} from "../tables/repair-comment.sql";
import { type RepairID } from "../tables/repair.sql";
import { userTable } from "../tables/user.sql";

const repairCommentFields = getTableColumns(repairCommentTable);

export function getAllRepairComments({ pagination }: DataTableOutput) {
  const query = db
    .select()
    .from(repairCommentTable)
    .where(isNull(repairCommentTable.deletedAt))
    .orderBy(repairCommentTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function countRepairComments(_input: DataTableCountOutput) {
  const query = db
    .select({ count: count() })
    .from(repairCommentTable)
    .where(isNull(repairCommentTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getAllRepairCommentsByRepairId(input: RepairID) {
  const query = db
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

export async function getRepairCommentById(input: RepairCommentID) {
  const query = db
    .select()
    .from(repairCommentTable)
    .where(eq(repairCommentTable.id, input));

  const [res] = await query.execute();
  return res;
}

export async function createRepairComment(input: CreateRepairComment) {
  const query = db.insert(repairCommentTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateRepairComment(input: UpdateRepairComment) {
  const query = db
    .update(repairCommentTable)
    .set(input)
    .where(eq(repairCommentTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveRepairComment(input: ArchiveRepairComment) {
  const query = db
    .update(repairCommentTable)
    .set(input)
    .where(eq(repairCommentTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
