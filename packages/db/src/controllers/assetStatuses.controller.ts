import { count, eq, isNull } from "drizzle-orm";

import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { db } from "../index";
import {
  type ArchiveAssetStatus,
  type AssetStatusID,
  assetStatusTable,
  type CreateAssetStatus,
  type UpdateAssetStatus,
} from "../schemas/asset-status.table";

export function getAll({ pagination }: GetAll) {
  const query = db
    .select()
    .from(assetStatusTable)
    .where(isNull(assetStatusTable.deletedAt))
    .orderBy(assetStatusTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getCount(_: GetCount) {
  const query = db
    .select({ count: count() })
    .from(assetStatusTable)
    .where(isNull(assetStatusTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getById(input: AssetStatusID) {
  const query = db
    .select()
    .from(assetStatusTable)
    .where(eq(assetStatusTable.id, input));
  const [res] = await query.execute();
  return res;
}

export function getSelect(_: GetSelect) {
  const query = db
    .select({
      value: assetStatusTable.id,
      label: assetStatusTable.name,
    })
    .from(assetStatusTable)
    .orderBy(assetStatusTable.name);
  return query.execute();
}

export async function create(input: CreateAssetStatus) {
  const query = db.insert(assetStatusTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateAssetStatus) {
  const query = db
    .update(assetStatusTable)
    .set(input)
    .where(eq(assetStatusTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveAssetStatus) {
  const query = db
    .update(assetStatusTable)
    .set(input)
    .where(eq(assetStatusTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
