import {
  CountModelImagesInput,
  GetAllModelImagesInput,
} from "@repo/validators/server/modelImages.validators";
import { and, count, eq, isNull } from "drizzle-orm";

import { db } from "../index";
import {
  type ArchiveModelImage,
  type CreateModelImage,
  type ModelImageID,
  modelImageTable,
  type UpdateModelImage,
} from "../tables/model-image.sql";
import { type ModelID } from "../tables/model.sql";

export function getAllModelImages({ pagination }: GetAllModelImagesInput) {
  const query = db
    .select()
    .from(modelImageTable)
    .where(isNull(modelImageTable.deletedAt))
    .orderBy(modelImageTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function countModelImages(_: CountModelImagesInput) {
  const query = db
    .select({ count: count() })
    .from(modelImageTable)
    .where(isNull(modelImageTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getAllModelImagesByModelId(id: ModelID) {
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

export async function getModelImageById(id: ModelImageID) {
  const query = db
    .select()
    .from(modelImageTable)
    .where(eq(modelImageTable.id, id));
  const [res] = await query.execute();
  return res;
}

export async function createModelImage(input: CreateModelImage) {
  const query = db.insert(modelImageTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateModelImage(input: UpdateModelImage) {
  const query = db
    .update(modelImageTable)
    .set(input)
    .where(eq(modelImageTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveModelImage(input: ArchiveModelImage) {
  const query = db
    .update(modelImageTable)
    .set(input)
    .where(eq(modelImageTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
