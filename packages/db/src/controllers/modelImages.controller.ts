import { and, count, eq, isNull } from "drizzle-orm";

import { type GetAll, type GetCount } from "../helpers/types";
import { db } from "../index";
import { type ModelID } from "../schemas/model.table";
import {
  type ArchiveModelImage,
  type CreateModelImage,
  type ModelImageID,
  modelImageTable,
  type UpdateModelImage,
} from "../schemas/model-image.table";

export function getAll({ pagination }: GetAll) {
  const query = db
    .select()
    .from(modelImageTable)
    .where(isNull(modelImageTable.deletedAt))
    .orderBy(modelImageTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getAllByModelId(id: ModelID) {
  const query = db
    .select()
    .from(modelImageTable)
    .where(
      and(isNull(modelImageTable.deletedAt), eq(modelImageTable.modelId, id)),
    )
    .orderBy(modelImageTable.id);
  const res = await query.execute();
  return res;
}

export async function getCount(_: GetCount) {
  const query = db
    .select({ count: count() })
    .from(modelImageTable)
    .where(isNull(modelImageTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getById(id: ModelImageID) {
  const query = db
    .select()
    .from(modelImageTable)
    .where(eq(modelImageTable.id, id));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateModelImage) {
  const query = db.insert(modelImageTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateModelImage) {
  const query = db
    .update(modelImageTable)
    .set(input)
    .where(eq(modelImageTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveModelImage) {
  const query = db
    .update(modelImageTable)
    .set(input)
    .where(eq(modelImageTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
