import type {
  GetAllInput,
  GetCountInput,
  GetSelectInput,
} from "@repo/validators/dataTables.validators";

import { count, eq, isNull } from "drizzle-orm";

import { db } from "..";
import {
  type ArchiveRepairStatusType,
  type CreateRepairStatusType,
  type RepairStatusTypeID,
  repairStatusTypeTable,
  type UpdateRepairStatusType,
} from "../tables/repair-status-type.sql";

export function getAllRepairStatusTypes({ pagination }: GetAllInput) {
  const query = db
    .select()
    .from(repairStatusTypeTable)
    .where(isNull(repairStatusTypeTable.deletedAt))
    .orderBy(repairStatusTypeTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getRepairStatusTypesCount(_: GetCountInput) {
  const query = db
    .select({ count: count() })
    .from(repairStatusTypeTable)
    .where(isNull(repairStatusTypeTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getRepairStatusTypesSelect(_: GetSelectInput) {
  const query = db
    .select({
      value: repairStatusTypeTable.id,
      label: repairStatusTypeTable.name,
    })
    .from(repairStatusTypeTable)
    .where(isNull(repairStatusTypeTable.deletedAt))
    .orderBy(repairStatusTypeTable.id);
  return query.execute();
}

export async function getRepairStatusById(input: RepairStatusTypeID) {
  const query = db
    .select()
    .from(repairStatusTypeTable)
    .where(eq(repairStatusTypeTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function createRepairStatus(input: CreateRepairStatusType) {
  const query = db.insert(repairStatusTypeTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateRepairStatus(input: UpdateRepairStatusType) {
  const query = db
    .update(repairStatusTypeTable)
    .set(input)
    .where(eq(repairStatusTypeTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveRepairStatus(input: ArchiveRepairStatusType) {
  const query = db
    .update(repairStatusTypeTable)
    .set(input)
    .where(eq(repairStatusTypeTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
