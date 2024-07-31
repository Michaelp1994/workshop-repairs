import { and, count, eq, isNull } from "drizzle-orm";

import { type GetAll, type GetCount } from "../helpers/types";
import { type Database } from "../index";
import {
  type CreateRepairComment,
  type DeleteRepairComment,
  type RepairCommentID,
  repairComments,
  type UpdateRepairComment,
} from "../schemas/repair-comments.schema";
import { type RepairID } from "../schemas/repairs.schema";
import { users } from "../schemas/users.schema";

export default {
  getAll({ pagination }: GetAll, db: Database) {
    const query = db
      .select()
      .from(repairComments)
      .where(isNull(repairComments.deletedAt))
      .orderBy(repairComments.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  },
  async getCount(_input: GetCount, db: Database) {
    const query = db
      .select({ count: count() })
      .from(repairComments)
      .where(isNull(repairComments.deletedAt));
    const [res] = await query.execute();
    return res?.count;
  },
  async getAllByRepairId(input: RepairID, db: Database) {
    const query = db
      .select({
        id: repairComments.id,
        comment: repairComments.comment,
        createdAt: repairComments.createdAt,
        createdBy: {
          firstName: users.firstName,
          lastName: users.lastName,
        },
      })
      .from(repairComments)
      .innerJoin(users, eq(repairComments.createdById, users.id))
      .where(
        and(
          isNull(repairComments.deletedAt),
          eq(repairComments.repairId, input),
        ),
      );
    const res = await query.execute();
    return res;
  },
  async getById(input: RepairCommentID, db: Database) {
    const query = db
      .select()
      .from(repairComments)
      .where(eq(repairComments.id, input));

    const [res] = await query.execute();
    return res;
  },
  async create(input: CreateRepairComment, db: Database) {
    const query = db.insert(repairComments).values(input).returning();
    const [res] = await query.execute();
    return res;
  },
  async update(input: UpdateRepairComment, db: Database) {
    const query = db
      .update(repairComments)
      .set(input)
      .where(eq(repairComments.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },
  async delete(input: DeleteRepairComment, db: Database) {
    const query = db
      .update(repairComments)
      .set(input)
      .where(eq(repairComments.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },
};
