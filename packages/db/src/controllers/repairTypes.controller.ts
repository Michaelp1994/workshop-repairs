import { count, eq, isNull } from "drizzle-orm";

import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { db } from "../index";
import {
  type ArchiveRepairType,
  type CreateRepairType,
  type RepairTypeID,
  repairTypes,
  type UpdateRepairType,
} from "../schemas/repair-types.schema";

export function getAll({ pagination }: GetAll) {
  const query = db
    .select()
    .from(repairTypes)
    .where(isNull(repairTypes.deletedAt))
    .orderBy(repairTypes.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getCount(_: GetCount) {
  const query = db
    .select({ count: count() })
    .from(repairTypes)
    .where(isNull(repairTypes.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getSelect(_: GetSelect) {
  const query = db
    .select({
      value: repairTypes.id,
      label: repairTypes.name,
    })
    .from(repairTypes)
    .where(isNull(repairTypes.deletedAt));
  return query.execute();
}

export async function getById(input: RepairTypeID) {
  const query = db.select().from(repairTypes).where(eq(repairTypes.id, input));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateRepairType) {
  const query = db.insert(repairTypes).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateRepairType) {
  const query = db
    .update(repairTypes)
    .set(input)
    .where(eq(repairTypes.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveRepairType) {
  const query = db
    .update(repairTypes)
    .set(input)
    .where(eq(repairTypes.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
