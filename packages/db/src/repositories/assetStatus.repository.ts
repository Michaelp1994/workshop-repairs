import type {
  CountAssetStatusesInput,
  GetAllAssetStatusesInput,
  GetAssetStatusesSelectInput,
} from "@repo/validators/server/assetStatuses.validators";

import { count, eq, isNull } from "drizzle-orm";

import type { ArchiveInput, CreateInput, UpdateInput } from "../types";

import { type DatabaseTransaction } from "../index";
import {
  type AssetStatusID,
  type AssetStatusInput,
  assetStatusTable,
} from "../tables/asset-status.sql";

export function getAllAssetStatuses(
  tx: DatabaseTransaction,
  { pagination }: GetAllAssetStatusesInput,
) {
  const query = tx
    .select()
    .from(assetStatusTable)
    .where(isNull(assetStatusTable.deletedAt))
    .orderBy(assetStatusTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function countAssetStatuses(
  tx: DatabaseTransaction,
  _: CountAssetStatusesInput,
) {
  const query = tx
    .select({ count: count() })
    .from(assetStatusTable)
    .where(isNull(assetStatusTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getAssetStatusById(
  tx: DatabaseTransaction,
  input: AssetStatusID,
) {
  const query = tx
    .select()
    .from(assetStatusTable)
    .where(eq(assetStatusTable.id, input));
  const [res] = await query.execute();
  return res;
}

export function getAssetStatusSelect(
  tx: DatabaseTransaction,
  _: GetAssetStatusesSelectInput,
) {
  const query = tx
    .select({
      value: assetStatusTable.id,
      label: assetStatusTable.name,
    })
    .from(assetStatusTable)
    .orderBy(assetStatusTable.name);
  return query.execute();
}

export async function createAssetStatus(
  tx: DatabaseTransaction,
  input: CreateInput<AssetStatusInput>,
) {
  const query = tx.insert(assetStatusTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateAssetStatus(
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

export async function archiveAssetStatus(
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
