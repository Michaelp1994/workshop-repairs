import type {
  DataTableCountSchema,
  DataTableInput,
  GetSelectInput,
} from "@repo/validators/dataTables.validators";

import { count, eq, isNull } from "drizzle-orm";

import { db } from "../index";
import {
  type ArchiveAssetStatus,
  type AssetStatusID,
  assetStatusTable,
  type CreateAssetStatus,
  type UpdateAssetStatus,
} from "../tables/asset-status.sql";

export function getAllAssetStatuses({ pagination }: DataTableInput) {
  const query = db
    .select()
    .from(assetStatusTable)
    .where(isNull(assetStatusTable.deletedAt))
    .orderBy(assetStatusTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function countAssetStatuses(_: DataTableCountSchema) {
  const query = db
    .select({ count: count() })
    .from(assetStatusTable)
    .where(isNull(assetStatusTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getAssetStatusById(input: AssetStatusID) {
  const query = db
    .select()
    .from(assetStatusTable)
    .where(eq(assetStatusTable.id, input));
  const [res] = await query.execute();
  return res;
}

export function getAssetStatusSelect(_: GetSelectInput) {
  const query = db
    .select({
      value: assetStatusTable.id,
      label: assetStatusTable.name,
    })
    .from(assetStatusTable)
    .orderBy(assetStatusTable.name);
  return query.execute();
}

export async function createAssetStatus(input: CreateAssetStatus) {
  const query = db.insert(assetStatusTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateAssetStatus(input: UpdateAssetStatus) {
  const query = db
    .update(assetStatusTable)
    .set(input)
    .where(eq(assetStatusTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveAssetStatus(input: ArchiveAssetStatus) {
  const query = db
    .update(assetStatusTable)
    .set(input)
    .where(eq(assetStatusTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
