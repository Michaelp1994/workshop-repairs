import {
  CountModelImagesInput,
  GetAllModelImagesInput,
} from "@repo/validators/server/modelImages.validators";
import { and, count, eq, isNull } from "drizzle-orm";

import type { ArchiveInput, CreateInput, UpdateInput } from "../types";

import { type DatabaseTransaction } from "../index";
import {
  type ModelImageID,
  type ModelImageInput,
  modelImageTable,
} from "../tables/model-image.sql";
import { type ModelID } from "../tables/model.sql";

export function getAllModelImages(
  tx: DatabaseTransaction,
  { pagination }: GetAllModelImagesInput,
) {
  const query = tx
    .select()
    .from(modelImageTable)
    .where(isNull(modelImageTable.deletedAt))
    .orderBy(modelImageTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function countModelImages(
  tx: DatabaseTransaction,
  _: CountModelImagesInput,
) {
  const query = tx
    .select({ count: count() })
    .from(modelImageTable)
    .where(isNull(modelImageTable.deletedAt));
  const [res] = await query.execute();
  return res?.count;
}

export async function getAllModelImagesByModelId(
  tx: DatabaseTransaction,
  id: ModelID,
) {
  const query = tx
    .select()
    .from(modelImageTable)
    .where(
      and(isNull(modelImageTable.deletedAt), eq(modelImageTable.modelId, id)),
    )
    .orderBy(modelImageTable.id);
  const res = await query.execute();
  return res;
}

export async function getModelImageById(
  tx: DatabaseTransaction,
  id: ModelImageID,
) {
  const query = tx
    .select()
    .from(modelImageTable)
    .where(eq(modelImageTable.id, id));
  const [res] = await query.execute();
  return res;
}

export async function createModelImage(
  tx: DatabaseTransaction,
  input: CreateInput<ModelImageInput>,
) {
  const query = tx.insert(modelImageTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateModelImage(
  tx: DatabaseTransaction,
  input: UpdateInput<ModelImageInput>,
  modelImageId: ModelImageID,
) {
  const query = tx
    .update(modelImageTable)
    .set(input)
    .where(eq(modelImageTable.id, modelImageId))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveModelImage(
  tx: DatabaseTransaction,
  input: ArchiveInput<ModelImageInput>,
  modelImageId: ModelImageID,
) {
  const query = tx
    .update(modelImageTable)
    .set(input)
    .where(eq(modelImageTable.id, modelImageId))
    .returning();
  const [res] = await query.execute();
  return res;
}
