import { count, eq, isNull } from "drizzle-orm";

import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "../types";

import { type DatabaseTransaction } from "../index";
import {
  type RepairTypeID,
  type RepairTypeInput,
  repairTypeTable,
} from "../tables/repair-type.table";

export default class RepairTypeRepository {
  async archiveRepairType(
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

  async countRepairTypes(tx: DatabaseTransaction, _input: CountInput) {
    const query = tx
      .select({ count: count() })
      .from(repairTypeTable)
      .where(isNull(repairTypeTable.deletedAt));
    const [res] = await query.execute();
    return res?.count;
  }

  async createRepairType(
    tx: DatabaseTransaction,
    input: CreateInput<RepairTypeInput>,
  ) {
    const query = tx.insert(repairTypeTable).values(input).returning();
    const [res] = await query.execute();
    return res;
  }

  async getAllRepairTypes(
    tx: DatabaseTransaction,
    { pagination }: GetAllInput,
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

  async getRepairTypeById(tx: DatabaseTransaction, input: RepairTypeID) {
    const query = tx
      .select()
      .from(repairTypeTable)
      .where(eq(repairTypeTable.id, input));
    const [res] = await query.execute();
    return res;
  }

  async getRepairTypesSelect(
    tx: DatabaseTransaction,
    _input: GetAllSimpleInput,
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

  async updateRepairType(
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
}
