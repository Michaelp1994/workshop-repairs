import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import { type GetAll, type GetCount } from "../helpers/types";
import { type Database } from "../index";
import {
  type ArchiveRepairComment,
  type CreateRepairComment,
  type RepairCommentID,
  repairComments,
  type UpdateRepairComment,
} from "../schemas/repair-comments.schema";
import { type RepairID } from "../schemas/repairs.schema";
import { users } from "../schemas/users.schema";

const repairCommentFields = getTableColumns(repairComments);

export function getAll({ pagination }: GetAll, db: Database) {
  const query = db
    .select()
    .from(repairComments)
    .where(isNull(repairComments.deletedAt))
    .orderBy(repairComments.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getCount(_input: GetCount, db: Database) {
  const query = db
    .select({ count: count() })
    .from(repairComments)
    .where(isNull(repairComments.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getAllByRepairId(input: RepairID, db: Database) {
  const query = db
    .select({
      ...repairCommentFields,
      createdBy: {
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
      },
    })
    .from(repairComments)
    .innerJoin(users, eq(repairComments.createdById, users.id))
    .where(
      and(isNull(repairComments.deletedAt), eq(repairComments.repairId, input)),
    )
    .orderBy(repairComments.createdAt);
  const res = await query.execute();
  return res;
}

export async function getById(input: RepairCommentID, db: Database) {
  const query = db
    .select()
    .from(repairComments)
    .where(eq(repairComments.id, input));

  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateRepairComment, db: Database) {
  const query = db.insert(repairComments).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateRepairComment, db: Database) {
  const query = db
    .update(repairComments)
    .set(input)
    .where(eq(repairComments.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveRepairComment, db: Database) {
  const query = db
    .update(repairComments)
    .set(input)
    .where(eq(repairComments.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
