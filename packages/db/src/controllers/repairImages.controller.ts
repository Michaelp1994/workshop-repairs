import { and, count, eq, isNull } from "drizzle-orm";

import type { Database } from "..";
import type { GetAll, GetCount } from "../helpers/types";
import type { RepairID } from "../schemas/repairs.schema";

import {
  type ArchiveRepairImage,
  type CreateRepairImage,
  type RepairImageID,
  repairImages,
  type UpdateRepairImage,
} from "../schemas/repair-images.schema";

export function getAll({ pagination }: GetAll, db: Database) {
  const query = db
    .select()
    .from(repairImages)
    .where(isNull(repairImages.deletedAt))
    .orderBy(repairImages.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}
export async function getCount(_: GetCount, db: Database) {
  const query = db
    .select({ count: count() })
    .from(repairImages)
    .where(isNull(repairImages.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}
export async function getById(input: RepairImageID, db: Database) {
  const query = db
    .select()
    .from(repairImages)
    .where(eq(repairImages.id, input));
  const [res] = await query.execute();
  return res;
}
export async function getAllByRepairId(input: RepairID, db: Database) {
  const query = db
    .select()
    .from(repairImages)
    .where(
      and(isNull(repairImages.deletedAt), eq(repairImages.repairId, input)),
    );
  const res = await query.execute();
  return res;
}
export async function create(input: CreateRepairImage, db: Database) {
  const query = db.insert(repairImages).values(input).returning();
  const [res] = await query.execute();
  return res;
}
export async function update(input: UpdateRepairImage, db: Database) {
  const query = db
    .update(repairImages)
    .set(input)
    .where(eq(repairImages.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveRepairImage, db: Database) {
  const query = db
    .update(repairImages)
    .set(input)
    .where(eq(repairImages.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
