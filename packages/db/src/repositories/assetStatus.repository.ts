import { count, eq, isNull } from "drizzle-orm";

import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "../types";

import { returnOne } from "../helpers/executeQuery";
import { type DatabaseTransaction } from "../index";
import {
  type AssetStatusID,
  type AssetStatusInput,
  assetStatusTable,
} from "../tables/assetStatus.table";

export default class AssetStatusRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<AssetStatusInput>,
    assetStatusId: AssetStatusID,
  ) {
    const query = tx
      .update(assetStatusTable)
      .set(input)
      .where(eq(assetStatusTable.id, assetStatusId))
      .returning();
    return await returnOne(query);
  }

  async count(tx: DatabaseTransaction, _input: CountInput) {
    const query = tx
      .select({ count: count() })
      .from(assetStatusTable)
      .where(isNull(assetStatusTable.deletedAt));
    const res = await returnOne(query);
    return res.count;
  }

  async create(tx: DatabaseTransaction, input: CreateInput<AssetStatusInput>) {
    const query = tx.insert(assetStatusTable).values(input).returning();
    return await returnOne(query);
  }

  async getAll(tx: DatabaseTransaction, { pagination }: GetAllInput) {
    const query = tx
      .select()
      .from(assetStatusTable)
      .where(isNull(assetStatusTable.deletedAt))
      .orderBy(assetStatusTable.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return await query.execute();
  }

  async getAllSimple(tx: DatabaseTransaction, _input: GetAllSimpleInput) {
    const query = tx
      .select({
        value: assetStatusTable.id,
        label: assetStatusTable.name,
      })
      .from(assetStatusTable)
      .orderBy(assetStatusTable.name);
    return await query.execute();
  }

  async getById(tx: DatabaseTransaction, input: AssetStatusID) {
    const query = tx
      .select()
      .from(assetStatusTable)
      .where(eq(assetStatusTable.id, input));
    return await returnOne(query);
  }

  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<AssetStatusInput>,
    assetStatusId: AssetStatusID,
  ) {
    const query = tx
      .update(assetStatusTable)
      .set(input)
      .where(eq(assetStatusTable.id, assetStatusId))
      .returning();
    return await returnOne(query);
  }
}
