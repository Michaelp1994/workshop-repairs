import { type Database } from "../index";
import { count, eq, isNull } from "drizzle-orm";
import {
  type CreateRepairType,
  type DeleteRepairType,
  type RepairTypeID,
  type UpdateRepairType,
  repairTypes,
} from "../schemas/repair-types.schema";
import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";

export default {
  getAll({ pagination }: GetAll, db: Database) {
    const query = db
      .select()
      .from(repairTypes)
      .where(isNull(repairTypes.deletedAt))
      .orderBy(repairTypes.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  },
  async getCount(_: GetCount, db: Database) {
    const query = db
      .select({ count: count() })
      .from(repairTypes)
      .where(isNull(repairTypes.deletedAt));
    const [res] = await query.execute();
    return res?.count;
  },
  async getSelect(_: GetSelect, db: Database) {
    const query = db
      .select({
        value: repairTypes.id,
        label: repairTypes.name,
      })
      .from(repairTypes)
      .where(isNull(repairTypes.deletedAt));
    return query.execute();
  },
  async getById(input: RepairTypeID, db: Database) {
    const query = db
      .select()
      .from(repairTypes)
      .where(eq(repairTypes.id, input));
    const [res] = await query.execute();
    return res;
  },
  async create(input: CreateRepairType, db: Database) {
    const query = db.insert(repairTypes).values(input).returning();
    const [res] = await query.execute();
    return res;
  },
  async update(input: UpdateRepairType, db: Database) {
    const query = db
      .update(repairTypes)
      .set(input)
      .where(eq(repairTypes.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },

  async delete(input: DeleteRepairType, db: Database) {
    const query = db
      .update(repairTypes)
      .set(input)
      .where(eq(repairTypes.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },
};
