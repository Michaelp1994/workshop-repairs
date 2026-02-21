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
} from "../tables/repairType.table";
import { returnOne } from "../helpers/executeQuery";

export default class RepairTypeRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<RepairTypeInput>,
    repairTypeId: RepairTypeID,
  ) {
    const query = tx
      .update(repairTypeTable)
      .set(input)
      .where(eq(repairTypeTable.id, repairTypeId))
      .returning();
    return await returnOne(query);
  }

  async count(tx: DatabaseTransaction, _input: CountInput) {
    const query = tx
      .select({ count: count() })
      .from(repairTypeTable)
      .where(isNull(repairTypeTable.deletedAt));
    const res = await returnOne(query);
    return res.count;
  }

  async create(tx: DatabaseTransaction, input: CreateInput<RepairTypeInput>) {
    const query = tx.insert(repairTypeTable).values(input).returning();
    return await returnOne(query);
  }

  async getAll(tx: DatabaseTransaction, { pagination }: GetAllInput) {
    const query = tx
      .select()
      .from(repairTypeTable)
      .where(isNull(repairTypeTable.deletedAt))
      .orderBy(repairTypeTable.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  }

  async getAllSimple(tx: DatabaseTransaction, _input: GetAllSimpleInput) {
    const query = tx
      .select({
        value: repairTypeTable.id,
        label: repairTypeTable.name,
      })
      .from(repairTypeTable)
      .where(isNull(repairTypeTable.deletedAt));
    return query.execute();
  }

  async getById(tx: DatabaseTransaction, input: RepairTypeID) {
    const query = tx
      .select()
      .from(repairTypeTable)
      .where(eq(repairTypeTable.id, input));
    return await returnOne(query);
  }

  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<RepairTypeInput>,
    repairTypeId: RepairTypeID,
  ) {
    const query = tx
      .update(repairTypeTable)
      .set(input)
      .where(eq(repairTypeTable.id, repairTypeId))
      .returning();
    return await returnOne(query);
  }
}
