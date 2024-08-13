import { count, eq, isNull } from "drizzle-orm";

import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { type Database } from "../index";
import {
  type ArchiveAssetStatus,
  assetStatuses,
  type AssetStatusID,
  type CreateAssetStatus,
  type UpdateAssetStatus,
} from "../schemas/asset-statuses.schema";

export function getAll({ pagination }: GetAll, db: Database) {
  const query = db
    .select()
    .from(assetStatuses)
    .where(isNull(assetStatuses.deletedAt))
    .orderBy(assetStatuses.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getCount(_: GetCount, db: Database) {
  const query = db
    .select({ count: count() })
    .from(assetStatuses)
    .where(isNull(assetStatuses.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getById(input: AssetStatusID, db: Database) {
  const query = db
    .select()
    .from(assetStatuses)
    .where(eq(assetStatuses.id, input));
  const [res] = await query.execute();
  return res;
}

export function getSelect(_: GetSelect, db: Database) {
  const query = db
    .select({
      value: assetStatuses.id,
      label: assetStatuses.name,
    })
    .from(assetStatuses)
    .orderBy(assetStatuses.name);
  return query.execute();
}

export async function create(input: CreateAssetStatus, db: Database) {
  const query = db.insert(assetStatuses).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateAssetStatus, db: Database) {
  const query = db
    .update(assetStatuses)
    .set(input)
    .where(eq(assetStatuses.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveAssetStatus, db: Database) {
  const query = db
    .update(assetStatuses)
    .set(input)
    .where(eq(assetStatuses.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
