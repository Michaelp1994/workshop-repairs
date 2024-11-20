import type {
  GetAllInput,
  GetCountInput,
  GetSelectInput,
} from "@repo/validators/dataTables.validators";

import { count, eq, isNull } from "drizzle-orm";

import { db } from "../index";
import {
  type ArchiveRepairType,
  type CreateRepairType,
  type RepairTypeID,
  repairTypeTable,
  type UpdateRepairType,
} from "../tables/repair-type.sql";

export function getAll({ pagination }: GetAllInput) {
  const query = db
    .select()
    .from(repairTypeTable)
    .where(isNull(repairTypeTable.deletedAt))
    .orderBy(repairTypeTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getCount(_: GetCountInput) {
  const query = db
    .select({ count: count() })
    .from(repairTypeTable)
    .where(isNull(repairTypeTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getSelect(_: GetSelectInput) {
  const query = db
    .select({
      value: repairTypeTable.id,
      label: repairTypeTable.name,
    })
    .from(repairTypeTable)
    .where(isNull(repairTypeTable.deletedAt));
  return query.execute();
}

export async function getById(input: RepairTypeID) {
  const query = db
    .select()
    .from(repairTypeTable)
    .where(eq(repairTypeTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateRepairType) {
  const query = db.insert(repairTypeTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateRepairType) {
  const query = db
    .update(repairTypeTable)
    .set(input)
    .where(eq(repairTypeTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveRepairType) {
  const query = db
    .update(repairTypeTable)
    .set(input)
    .where(eq(repairTypeTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
