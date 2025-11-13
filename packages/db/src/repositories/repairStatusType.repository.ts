import { count, eq, isNull } from "drizzle-orm";

import type { DatabaseTransaction } from "..";
import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "../types";

import {
  type RepairStatusTypeID,
  type RepairStatusTypeInput,
  repairStatusTypeTable,
} from "../tables/repair-status-type.sql";

export default class RepairStatusTypeRepository {
  async archiveRepairStatus(
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

  async countRepairStatusTypes(tx: DatabaseTransaction, _input: CountInput) {
    const query = tx
      .select({ count: count() })
      .from(repairStatusTypeTable)
      .where(isNull(repairStatusTypeTable.deletedAt));
    const [res] = await query.execute();
    return res?.count;
  }

  async createRepairStatus(
    tx: DatabaseTransaction,
    input: CreateInput<RepairStatusTypeInput>,
  ) {
    const query = tx.insert(repairStatusTypeTable).values(input).returning();
    const [res] = await query.execute();
    return res;
  }

  async getAllRepairStatusTypes(
    tx: DatabaseTransaction,
    { pagination }: GetAllInput,
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

  async getRepairStatusById(
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

  async getRepairStatusTypesSelect(
    tx: DatabaseTransaction,
    _input: GetAllSimpleInput,
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

  async updateRepairStatus(
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
}
