import { count, eq, isNull } from "drizzle-orm";
import { type Database } from "../index";
import {
  type DeleteRepairStatusType,
  type CreateRepairStatusType,
  repairStatusTypes,
  type UpdateRepairStatusType,
  type RepairStatusTypeID,
} from "../schemas/repair-status-types.schema";
import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";

export default {
  getAll({ pagination }: GetAll, db: Database) {
    const query = db
      .select()
      .from(repairStatusTypes)
      .where(isNull(repairStatusTypes.deletedAt))
      .orderBy(repairStatusTypes.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  },
  async getCount(_: GetCount, db: Database) {
    const query = db
      .select({ count: count() })
      .from(repairStatusTypes)
      .where(isNull(repairStatusTypes.deletedAt));
    const [res] = await query.execute();
    return res?.count;
  },
  async getSelect(_: GetSelect, db: Database) {
    const query = db
      .select({
        value: repairStatusTypes.id,
        label: repairStatusTypes.name,
      })
      .from(repairStatusTypes)
      .where(isNull(repairStatusTypes.deletedAt))
      .orderBy(repairStatusTypes.id);
    return query.execute();
  },
  async getById(input: RepairStatusTypeID, db: Database) {
    const query = db
      .select()
      .from(repairStatusTypes)
      .where(eq(repairStatusTypes.id, input));
    const [res] = await query.execute();
    return res;
  },
  async create(input: CreateRepairStatusType, db: Database) {
    const query = db.insert(repairStatusTypes).values(input).returning();
    const [res] = await query.execute();
    return res;
  },
  async update(input: UpdateRepairStatusType, db: Database) {
    const query = db
      .update(repairStatusTypes)
      .set(input)
      .where(eq(repairStatusTypes.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },

  async delete(input: DeleteRepairStatusType, db: Database) {
    const query = db
      .update(repairStatusTypes)
      .set(input)
      .where(eq(repairStatusTypes.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },
};
