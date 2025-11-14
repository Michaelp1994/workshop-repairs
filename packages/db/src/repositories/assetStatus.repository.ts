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
    const [res] = await query.execute();
    return res;
  }

  async count(tx: DatabaseTransaction, _input: CountInput) {
    const query = tx
      .select({ count: count() })
      .from(assetStatusTable)
      .where(isNull(assetStatusTable.deletedAt));
    const [res] = await query.execute();
    return res?.count;
  }

  async create(tx: DatabaseTransaction, input: CreateInput<AssetStatusInput>) {
    const query = tx.insert(assetStatusTable).values(input).returning();
    const [res] = await query.execute();
    return res;
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
    const [res] = await query.execute();
    return res;
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
    const [res] = await query.execute();
    return res;
  }
}
