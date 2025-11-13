import { and, count, eq, isNull } from "drizzle-orm";

import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  UpdateInput,
} from "../types";

import { type DatabaseTransaction } from "../index";
import {
  type ModelImageID,
  type ModelImageInput,
  modelImageTable,
} from "../tables/model-image.sql";
import { type ModelID } from "../tables/model.sql";

export default class ModelImageRepository {
  async archiveModelImage(
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

  async countModelImages(tx: DatabaseTransaction, _input: CountInput) {
    const query = tx
      .select({ count: count() })
      .from(modelImageTable)
      .where(isNull(modelImageTable.deletedAt));
    const [res] = await query.execute();
    return res?.count;
  }

  async createModelImage(
    tx: DatabaseTransaction,
    input: CreateInput<ModelImageInput>,
  ) {
    const query = tx.insert(modelImageTable).values(input).returning();
    const [res] = await query.execute();
    return res;
  }

  async getAllModelImages(
    tx: DatabaseTransaction,
    { pagination }: GetAllInput,
  ) {
    const query = tx
      .select()
      .from(modelImageTable)
      .where(isNull(modelImageTable.deletedAt))
      .orderBy(modelImageTable.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return await query.execute();
  }

  async getAllModelImagesByModelId(tx: DatabaseTransaction, id: ModelID) {
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

  async getModelImageById(tx: DatabaseTransaction, id: ModelImageID) {
    const query = tx
      .select()
      .from(modelImageTable)
      .where(eq(modelImageTable.id, id));
    const [res] = await query.execute();
    return res;
  }

  async updateModelImage(
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
}
