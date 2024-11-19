import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import { db } from "..";
import { type GetAll, type GetCount } from "../helpers/types";
import { assetTable } from "../schemas/asset.table";
import { partTable } from "../schemas/part.table";
import { type RepairID, repairTable } from "../schemas/repair.table";
import {
  type ArchiveRepairPart,
  type CreateRepairPart,
  type RepairPartID,
  repairPartTable,
  type UpdateRepairPart,
} from "../schemas/repair-part.table";

const repairPartFields = getTableColumns(repairPartTable);
const assetFields = getTableColumns(assetTable);

export function getAll({ pagination }: GetAll) {
  const query = db
    .select()
    .from(repairPartTable)
    .where(isNull(repairPartTable.deletedAt))
    .orderBy(repairPartTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getCount(_: GetCount) {
  const query = db
    .select({ count: count() })
    .from(repairPartTable)
    .where(isNull(repairPartTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getById(input: RepairPartID) {
  const query = db
    .select({
      ...repairPartFields,
      assets: assetFields,
    })
    .from(repairPartTable)
    .innerJoin(repairTable, eq(repairTable.id, repairPartTable.repairId))
    .innerJoin(assetTable, eq(assetTable.id, repairTable.assetId))
    .where(eq(repairPartTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function getAllByRepairId(input: RepairID) {
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

export async function create(input: CreateRepairPart) {
  const query = db.insert(repairPartTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateRepairPart) {
  const query = db
    .update(repairPartTable)
    .set(input)
    .where(eq(repairPartTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveRepairPart) {
  const query = db
    .update(repairPartTable)
    .set(input)
    .where(eq(repairPartTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
