import type {
  DataTableInput,
  DataTableCountSchema,
} from "@repo/validators/dataTables.validators";

import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import { db } from "..";
import { assetTable } from "../tables/asset.sql";
import { partTable } from "../tables/part.sql";
import { type RepairID, repairTable } from "../tables/repair.sql";
import {
  type ArchiveRepairPart,
  type CreateRepairPart,
  type RepairPartID,
  repairPartTable,
  type UpdateRepairPart,
} from "../tables/repair-part.sql";

const repairPartFields = getTableColumns(repairPartTable);

export function getAllRepairParts({ pagination }: DataTableInput) {
  const query = db
    .select()
    .from(repairPartTable)
    .where(isNull(repairPartTable.deletedAt))
    .orderBy(repairPartTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getRepairPartsCount(_: DataTableCountSchema) {
  const query = db
    .select({ count: count() })
    .from(repairPartTable)
    .where(isNull(repairPartTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getRepairPartById(input: RepairPartID) {
  const query = db
    .select({
      ...repairPartFields,
      assets: assetTable,
    })
    .from(repairPartTable)
    .innerJoin(repairTable, eq(repairTable.id, repairPartTable.repairId))
    .innerJoin(assetTable, eq(assetTable.id, repairTable.assetId))
    .where(eq(repairPartTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function getAllRepairPartsByRepairId(input: RepairID) {
  const query = db
    .select()
    .from(repairPartTable)
    .innerJoin(partTable, eq(partTable.id, repairPartTable.partId))
    .where(
      and(
        isNull(repairPartTable.deletedAt),
        eq(repairPartTable.repairId, input),
      ),
    );
  const res = await query.execute();
  return res;
}

export async function createRepairPart(input: CreateRepairPart) {
  const query = db.insert(repairPartTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateRepairPart(input: UpdateRepairPart) {
  const query = db
    .update(repairPartTable)
    .set(input)
    .where(eq(repairPartTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveRepairPart(input: ArchiveRepairPart) {
  const query = db
    .update(repairPartTable)
    .set(input)
    .where(eq(repairPartTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
