import { and, count, eq, isNull } from "drizzle-orm";
import { type Database } from "../index";
import {
  type DeleteRepairImage,
  type CreateRepairImage,
  repairImages,
  type UpdateRepairImage,
  type RepairImageID,
} from "../schemas/repair-images.schema";
import { type GetAll, type GetCount } from "../helpers/types";
import { type RepairID } from "../schemas/repairs.schema";

export default {
  getAll({ pagination }: GetAll, db: Database) {
    const query = db
      .select()
      .from(repairImages)
      .where(isNull(repairImages.deletedAt))
      .orderBy(repairImages.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  },
  async getCount(_: GetCount, db: Database) {
    const query = db
      .select({ count: count() })
      .from(repairImages)
      .where(isNull(repairImages.deletedAt));
    const [res] = await query.execute();
    return res?.count;
  },
  async getById(input: RepairImageID, db: Database) {
    const query = db
      .select()
      .from(repairImages)
      .where(eq(repairImages.id, input));
    const [res] = await query.execute();
    return res;
  },
  async getAllByRepairId(input: RepairID, db: Database) {
    const query = db
      .select()
      .from(repairImages)
      .where(
        and(isNull(repairImages.deletedAt), eq(repairImages.repairId, input)),
      );
    const res = await query.execute();
    return res;
  },
  async create(input: CreateRepairImage, db: Database) {
    const query = db.insert(repairImages).values(input).returning();
    const [res] = await query.execute();
    return res;
  },
  async update(input: UpdateRepairImage, db: Database) {
    const query = db
      .update(repairImages)
      .set(input)
      .where(eq(repairImages.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },

  async delete(input: DeleteRepairImage, db: Database) {
    const query = db
      .update(repairImages)
      .set(input)
      .where(eq(repairImages.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },
};
