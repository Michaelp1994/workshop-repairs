import type {
  CountRepairStatusTypesInput,
  GetAllRepairStatusTypesInput,
  GetRepairStatusSelectInput,
} from "@repo/validators/server/repairStatusTypes.validators";

import { count, eq, isNull } from "drizzle-orm";

import type { DatabaseTransaction } from "..";
import type { ArchiveInput, CreateInput, UpdateInput } from "../types";

import {
  type RepairStatusTypeID,
  type RepairStatusTypeInput,
  repairStatusTypeTable,
} from "../tables/repair-status-type.sql";

export function getAllRepairStatusTypes(
  tx: DatabaseTransaction,
  { pagination }: GetAllRepairStatusTypesInput,
) {
  const query = tx
    .select()
    .from(repairStatusTypeTable)
    .where(isNull(repairStatusTypeTable.deletedAt))
    .orderBy(repairStatusTypeTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function countRepairStatusTypes(
  tx: DatabaseTransaction,
  _: CountRepairStatusTypesInput,
) {
  const query = tx
    .select({ count: count() })
    .from(repairStatusTypeTable)
    .where(isNull(repairStatusTypeTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getRepairStatusTypesSelect(
  tx: DatabaseTransaction,
  _: GetRepairStatusSelectInput,
) {
  const query = tx
    .select({
      value: repairStatusTypeTable.id,
      label: repairStatusTypeTable.name,
    })
    .from(repairStatusTypeTable)
    .where(isNull(repairStatusTypeTable.deletedAt))
    .orderBy(repairStatusTypeTable.id);
  return query.execute();
}

export async function getRepairStatusById(
  tx: DatabaseTransaction,
  input: RepairStatusTypeID,
) {
  const query = tx
    .select()
    .from(repairStatusTypeTable)
    .where(eq(repairStatusTypeTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function createRepairStatus(
  tx: DatabaseTransaction,
  input: CreateInput<RepairStatusTypeInput>,
) {
  const query = tx.insert(repairStatusTypeTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateRepairStatus(
  tx: DatabaseTransaction,
  input: UpdateInput<RepairStatusTypeInput>,
  repairStatusTypeId: RepairStatusTypeID,
) {
  const query = tx
    .update(repairStatusTypeTable)
    .set(input)
    .where(eq(repairStatusTypeTable.id, repairStatusTypeId))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveRepairStatus(
  tx: DatabaseTransaction,
  input: ArchiveInput<RepairStatusTypeInput>,
  repairStatusTypeId: RepairStatusTypeID,
) {
  const query = tx
    .update(repairStatusTypeTable)
    .set(input)
    .where(eq(repairStatusTypeTable.id, repairStatusTypeId))
    .returning();
  const [res] = await query.execute();
  return res;
}
