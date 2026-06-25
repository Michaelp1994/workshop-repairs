import { count, eq, isNull } from "drizzle-orm";

import type { DatabaseTransaction } from "../db";
import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "../types";

import { returnOne } from "../helpers/executeQuery";
import {
  type RepairStatusTypeID,
  type RepairStatusTypeInput,
  repairStatusTypeTable,
} from "../tables/repairStatusType.table";

export default class RepairStatusTypeRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<RepairStatusTypeInput>,
    repairStatusTypeId: RepairStatusTypeID,
  ) {
    const query = tx
      .update(repairStatusTypeTable)
      .set(input)
      .where(eq(repairStatusTypeTable.id, repairStatusTypeId))
      .returning();
    return await returnOne(query);
  }

  async count(tx: DatabaseTransaction, _input: CountInput) {
    const query = tx
      .select({ count: count() })
      .from(repairStatusTypeTable)
      .where(isNull(repairStatusTypeTable.deletedAt));
    const res = await returnOne(query);
    return res.count;
  }

  async create(
    tx: DatabaseTransaction,
    input: CreateInput<RepairStatusTypeInput>,
  ) {
    const query = tx.insert(repairStatusTypeTable).values(input).returning();
    return await returnOne(query);
  }

  async getAll(tx: DatabaseTransaction, { pagination }: GetAllInput) {
    const query = tx
      .select()
      .from(repairStatusTypeTable)
      .where(isNull(repairStatusTypeTable.deletedAt))
      .orderBy(repairStatusTypeTable.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  }

  async getAllSimple(tx: DatabaseTransaction, _input: GetAllSimpleInput) {
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

  async getById(tx: DatabaseTransaction, input: RepairStatusTypeID) {
    const query = tx
      .select()
      .from(repairStatusTypeTable)
      .where(eq(repairStatusTypeTable.id, input));
    return await returnOne(query);
  }

  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<RepairStatusTypeInput>,
    repairStatusTypeId: RepairStatusTypeID,
  ) {
    const query = tx
      .update(repairStatusTypeTable)
      .set(input)
      .where(eq(repairStatusTypeTable.id, repairStatusTypeId))
      .returning();
    return await returnOne(query);
  }
}
