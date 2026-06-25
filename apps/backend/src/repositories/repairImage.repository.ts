import { and, count, eq, isNull } from "drizzle-orm";

import type { RepairID } from "../tables/repair.table";
import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  UpdateInput,
} from "../types";

import { type DatabaseTransaction } from "../db";
import { returnOne } from "../helpers/executeQuery";
import {
  type RepairImageID,
  type RepairImageInput,
  repairImageTable,
} from "../tables/repairImage.table";

export default class RepairImageRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<RepairImageInput>,
    repairImageId: RepairImageID,
  ) {
    const query = tx
      .update(repairImageTable)
      .set(input)
      .where(eq(repairImageTable.id, repairImageId))
      .returning();
    return await returnOne(query);
  }
  async count(tx: DatabaseTransaction, _input: CountInput) {
    const query = tx
      .select({ count: count() })
      .from(repairImageTable)
      .where(isNull(repairImageTable.deletedAt));
    const res = await returnOne(query);
    return res.count;
  }
  async create(tx: DatabaseTransaction, input: CreateInput<RepairImageInput>) {
    const query = tx.insert(repairImageTable).values(input).returning();
    return await returnOne(query);
  }
  async getAll(tx: DatabaseTransaction, { pagination }: GetAllInput) {
    const query = tx
      .select()
      .from(repairImageTable)
      .where(isNull(repairImageTable.deletedAt))
      .orderBy(repairImageTable.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  }
  async getAllByRepairId(tx: DatabaseTransaction, input: RepairID) {
    const query = tx
      .select()
      .from(repairImageTable)
      .where(
        and(
          isNull(repairImageTable.deletedAt),
          eq(repairImageTable.repairId, input),
        ),
      );
    const res = await query.execute();
    return res;
  }
  async getById(tx: DatabaseTransaction, input: RepairImageID) {
    const query = tx
      .select()
      .from(repairImageTable)
      .where(eq(repairImageTable.id, input));
    return await returnOne(query);
  }

  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<RepairImageInput>,
    repairImageId: RepairImageID,
  ) {
    const query = tx
      .update(repairImageTable)
      .set(input)
      .where(eq(repairImageTable.id, repairImageId))
      .returning();
    return await returnOne(query);
  }
}
