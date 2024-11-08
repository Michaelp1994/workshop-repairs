import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import { type GetAll, type GetCount } from "../helpers/types";
import { type Database } from "../index";
import {
  type ArchiveRepairComment,
  type CreateRepairComment,
  type RepairCommentID,
  repairCommentTable,
  type UpdateRepairComment,
} from "../schemas/repair-comment.table";
import { type RepairID } from "../schemas/repair.table";
import { userTable } from "../schemas/user.table";

const repairCommentFields = getTableColumns(repairCommentTable);

export function getAll({ pagination }: GetAll, db: Database) {
  const query = db
    .select()
    .from(repairCommentTable)
    .where(isNull(repairCommentTable.deletedAt))
    .orderBy(repairCommentTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getCount(_input: GetCount, db: Database) {
  const query = db
    .select({ count: count() })
    .from(repairCommentTable)
    .where(isNull(repairCommentTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getAllByRepairId(input: RepairID, db: Database) {
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

export async function getById(input: RepairCommentID, db: Database) {
  const query = db
    .select()
    .from(repairCommentTable)
    .where(eq(repairCommentTable.id, input));

  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateRepairComment, db: Database) {
  const query = db.insert(repairCommentTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateRepairComment, db: Database) {
  const query = db
    .update(repairCommentTable)
    .set(input)
    .where(eq(repairCommentTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveRepairComment, db: Database) {
  const query = db
    .update(repairCommentTable)
    .set(input)
    .where(eq(repairCommentTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
