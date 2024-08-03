import { and, count, eq, isNull } from "drizzle-orm";

import { type GetAll, type GetCount } from "../helpers/types";
import { type Database } from "../index";
import { parts } from "../schemas/parts.schema";
import {
  type ArchiveRepairPart,
  type CreateRepairPart,
  type RepairPartID,
  repairParts,
  type UpdateRepairPart,
} from "../schemas/repair-parts.schema";
import { type RepairID } from "../schemas/repairs.schema";

export function getAll({ pagination }: GetAll, db: Database) {
  const query = db
    .select()
    .from(repairParts)
    .where(isNull(repairParts.deletedAt))
    .orderBy(repairParts.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getCount(_: GetCount, db: Database) {
  const query = db
    .select({ count: count() })
    .from(repairParts)
    .where(isNull(repairParts.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getById(input: RepairPartID, db: Database) {
  const query = db.select().from(repairParts).where(eq(repairParts.id, input));
  const [res] = await query.execute();
  return res;
}

export async function getAllByRepairId(input: RepairID, db: Database) {
  const query = db
    .select()
    .from(repairParts)
    .innerJoin(parts, eq(parts.id, repairParts.partId))
    .where(and(isNull(repairParts.deletedAt), eq(repairParts.repairId, input)));
  const res = await query.execute();
  return res;
}

export async function create(input: CreateRepairPart, db: Database) {
  const query = db.insert(repairParts).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateRepairPart, db: Database) {
  const query = db
    .update(repairParts)
    .set(input)
    .where(eq(repairParts.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveRepairPart, db: Database) {
  const query = db
    .update(repairParts)
    .set(input)
    .where(eq(repairParts.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
