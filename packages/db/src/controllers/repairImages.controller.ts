import type {
  GetAllInput,
  GetCountInput,
} from "@repo/validators/dataTables.validators";

import { and, count, eq, isNull } from "drizzle-orm";

import type { RepairID } from "../tables/repair.sql";

import { db } from "..";
import {
  type ArchiveRepairImage,
  type CreateRepairImage,
  type RepairImageID,
  repairImageTable,
  type UpdateRepairImage,
} from "../tables/repair-image.sql";

export function getAll({ pagination }: GetAllInput) {
  const query = db
    .select()
    .from(repairImageTable)
    .where(isNull(repairImageTable.deletedAt))
    .orderBy(repairImageTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}
export async function getCount(_: GetCountInput) {
  const query = db
    .select({ count: count() })
    .from(repairImageTable)
    .where(isNull(repairImageTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}
export async function getById(input: RepairImageID) {
  const query = db
    .select()
    .from(repairImageTable)
    .where(eq(repairImageTable.id, input));
  const [res] = await query.execute();
  return res;
}
export async function getAllByRepairId(input: RepairID) {
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
export async function create(input: CreateRepairImage) {
  const query = db.insert(repairImageTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}
export async function update(input: UpdateRepairImage) {
  const query = db
    .update(repairImageTable)
    .set(input)
    .where(eq(repairImageTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveRepairImage) {
  const query = db
    .update(repairImageTable)
    .set(input)
    .where(eq(repairImageTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
