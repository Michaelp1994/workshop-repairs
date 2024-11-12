import { and, count, eq, isNull } from "drizzle-orm";

import type { Database } from "..";
import type { GetAll, GetCount } from "../helpers/types";
import type { RepairID } from "../schemas/repair.table";

import {
  type ArchiveRepairImage,
  type CreateRepairImage,
  type RepairImageID,
  repairImageTable,
  type UpdateRepairImage,
} from "../schemas/repair-image.table";

export function getAll({ pagination }: GetAll, db: Database) {
  const query = db
    .select()
    .from(repairImageTable)
    .where(isNull(repairImageTable.deletedAt))
    .orderBy(repairImageTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}
export async function getCount(_: GetCount, db: Database) {
  const query = db
    .select({ count: count() })
    .from(repairImageTable)
    .where(isNull(repairImageTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}
export async function getById(input: RepairImageID, db: Database) {
  const query = db
    .select()
    .from(repairImageTable)
    .where(eq(repairImageTable.id, input));
  const [res] = await query.execute();
  return res;
}
export async function getAllByRepairId(input: RepairID, db: Database) {
  const query = db
    .select()
    .from(repairImageTable)
    .where(
      and(
        isNull(repairImageTable.deletedAt),
        eq(repairImageTable.repairId, input),
      ),
    );
  const res = await query.execute();
  return res;
}
export async function create(input: CreateRepairImage, db: Database) {
  const query = db.insert(repairImageTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}
export async function update(input: UpdateRepairImage, db: Database) {
  const query = db
    .update(repairImageTable)
    .set(input)
    .where(eq(repairImageTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveRepairImage, db: Database) {
  const query = db
    .update(repairImageTable)
    .set(input)
    .where(eq(repairImageTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
