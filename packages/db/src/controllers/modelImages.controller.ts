import { and, count, eq, isNull } from "drizzle-orm";

import { type GetAll, type GetCount } from "../helpers/types";
import { type Database } from "../index";
import {
  type ArchiveModelImage,
  type CreateModelImage,
  type ModelImageID,
  modelImages,
  type UpdateModelImage,
} from "../schemas/model-images.schema";
import { type ModelID } from "../schemas/models.schema";

export function getAll({ pagination }: GetAll, db: Database) {
  const query = db
    .select()
    .from(modelImages)
    .where(isNull(modelImages.deletedAt))
    .orderBy(modelImages.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getAllByModelId(id: ModelID, db: Database) {
  const query = db
    .select()
    .from(modelImages)
    .where(and(isNull(modelImages.deletedAt), eq(modelImages.modelId, id)))
    .orderBy(modelImages.id);
  const res = await query.execute();
  return res;
}

export async function getCount(_: GetCount, db: Database) {
  const query = db
    .select({ count: count() })
    .from(modelImages)
    .where(isNull(modelImages.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getById(id: ModelImageID, db: Database) {
  const query = db.select().from(modelImages).where(eq(modelImages.id, id));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateModelImage, db: Database) {
  const query = db.insert(modelImages).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateModelImage, db: Database) {
  const query = db
    .update(modelImages)
    .set(input)
    .where(eq(modelImages.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveModelImage, db: Database) {
  const query = db
    .update(modelImages)
    .set(input)
    .where(eq(modelImages.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
