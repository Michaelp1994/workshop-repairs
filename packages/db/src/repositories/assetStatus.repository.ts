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
  async archiveAssetStatus(
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

  async countAssetStatuses(tx: DatabaseTransaction, _input: CountInput) {
    const query = tx
      .select({ count: count() })
      .from(assetStatusTable)
      .where(isNull(assetStatusTable.deletedAt));
    const [res] = await query.execute();
    return res?.count;
  }

  async createAssetStatus(
    tx: DatabaseTransaction,
    input: CreateInput<AssetStatusInput>,
  ) {
    const query = tx.insert(assetStatusTable).values(input).returning();
    const [res] = await query.execute();
    return res;
  }

  async getAllAssetStatuses(
    tx: DatabaseTransaction,
    { pagination }: GetAllInput,
  ) {
    const query = tx
      .select()
      .from(assetStatusTable)
      .where(isNull(assetStatusTable.deletedAt))
      .orderBy(assetStatusTable.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return await query.execute();
  }

  async getAssetStatusById(tx: DatabaseTransaction, input: AssetStatusID) {
    const query = tx
      .select()
      .from(assetStatusTable)
      .where(eq(assetStatusTable.id, input));
    const [res] = await query.execute();
    return res;
  }

  async getAssetStatusSelect(
    tx: DatabaseTransaction,
    _input: GetAllSimpleInput,
  ) {
    const query = tx
      .select({
        value: assetStatusTable.id,
        label: assetStatusTable.name,
      })
      .from(assetStatusTable)
      .orderBy(assetStatusTable.name);
    return await query.execute();
  }

  async updateAssetStatus(
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
