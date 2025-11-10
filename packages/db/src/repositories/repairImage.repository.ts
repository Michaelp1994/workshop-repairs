import {
  CountRepairImagesInput,
  GetAllRepairImagesInput,
} from "@repo/validators/server/repairImages.validators";
import { and, count, eq, isNull } from "drizzle-orm";

import type { RepairID } from "../tables/repair.sql";
import type { ArchiveInput, CreateInput, UpdateInput } from "../types";

import { type DatabaseTransaction } from "..";
import {
  type RepairImageID,
  type RepairImageInput,
  repairImageTable,
} from "../tables/repair-image.sql";

export function getAllRepairImages(
  tx: DatabaseTransaction,
  { pagination }: GetAllRepairImagesInput,
) {
  const query = tx
    .select()
    .from(repairImageTable)
    .where(isNull(repairImageTable.deletedAt))
    .orderBy(repairImageTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}
export async function countRepairImages(
  tx: DatabaseTransaction,
  _: CountRepairImagesInput,
) {
  const query = tx
    .select({ count: count() })
    .from(repairImageTable)
    .where(isNull(repairImageTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}
export async function getRepairImageById(
  tx: DatabaseTransaction,
  input: RepairImageID,
) {
  const query = tx
    .select()
    .from(repairImageTable)
    .where(eq(repairImageTable.id, input));
  const [res] = await query.execute();
  return res;
}
export async function getAllRepairImagesByRepairId(
  tx: DatabaseTransaction,
  input: RepairID,
) {
  const query = tx
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
export async function createRepairImage(
  tx: DatabaseTransaction,
  input: CreateInput<RepairImageInput>,
) {
  const query = tx.insert(repairImageTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}
export async function updateRepairImage(
  tx: DatabaseTransaction,
  input: UpdateInput<RepairImageInput>,
  repairImageId: RepairImageID,
) {
  const query = tx
    .update(repairImageTable)
    .set(input)
    .where(eq(repairImageTable.id, repairImageId))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveRepairImage(
  tx: DatabaseTransaction,
  input: ArchiveInput<RepairImageInput>,
  repairImageId: RepairImageID,
) {
  const query = tx
    .update(repairImageTable)
    .set(input)
    .where(eq(repairImageTable.id, repairImageId))
    .returning();
  const [res] = await query.execute();
  return res;
}
