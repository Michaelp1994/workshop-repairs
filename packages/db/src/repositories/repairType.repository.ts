import type {
  CountRepairTypesInput,
  GetAllRepairTypesInput,
  GetRepairTypesSelectInput,
} from "@repo/validators/server/repairTypes.validators";

import { count, eq, isNull } from "drizzle-orm";

import type { ArchiveInput, CreateInput, UpdateInput } from "../types";

import { type DatabaseTransaction } from "../index";
import {
  type RepairTypeID,
  type RepairTypeInput,
  repairTypeTable,
} from "../tables/repair-type.sql";

export function getAllRepairTypes(
  tx: DatabaseTransaction,
  { pagination }: GetAllRepairTypesInput,
) {
  const query = tx
    .select()
    .from(repairTypeTable)
    .where(isNull(repairTypeTable.deletedAt))
    .orderBy(repairTypeTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function countRepairTypes(
  tx: DatabaseTransaction,
  _: CountRepairTypesInput,
) {
  const query = tx
    .select({ count: count() })
    .from(repairTypeTable)
    .where(isNull(repairTypeTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getRepairTypesSelect(
  tx: DatabaseTransaction,
  _: GetRepairTypesSelectInput,
) {
  const query = tx
    .select({
      value: repairTypeTable.id,
      label: repairTypeTable.name,
    })
    .from(repairTypeTable)
    .where(isNull(repairTypeTable.deletedAt));
  return query.execute();
}

export async function getRepairTypeById(
  tx: DatabaseTransaction,
  input: RepairTypeID,
) {
  const query = tx
    .select()
    .from(repairTypeTable)
    .where(eq(repairTypeTable.id, input));
  const [res] = await query.execute();
  return res;
}

export async function createRepairType(
  tx: DatabaseTransaction,
  input: CreateInput<RepairTypeInput>,
) {
  const query = tx.insert(repairTypeTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateRepairType(
  tx: DatabaseTransaction,
  input: UpdateInput<RepairTypeInput>,
  repairTypeId: RepairTypeID,
) {
  const query = tx
    .update(repairTypeTable)
    .set(input)
    .where(eq(repairTypeTable.id, repairTypeId))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveRepairType(
  tx: DatabaseTransaction,
  input: ArchiveInput<RepairTypeInput>,
  repairTypeId: RepairTypeID,
) {
  const query = tx
    .update(repairTypeTable)
    .set(input)
    .where(eq(repairTypeTable.id, repairTypeId))
    .returning();
  const [res] = await query.execute();
  return res;
}
