import { and, count, eq, isNull } from "drizzle-orm";

import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  UpdateInput,
} from "../types";

import { type DatabaseTransaction } from "../db";
import { returnOne } from "../helpers/executeQuery";
import { type ModelID } from "../tables/model.table";
import {
  type ModelImageID,
  type ModelImageInput,
  modelImageTable,
} from "../tables/modelImage.table";

export default class ModelImageRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<ModelImageInput>,
    modelImageId: ModelImageID,
  ) {
    const query = tx
      .update(modelImageTable)
      .set(input)
      .where(eq(modelImageTable.id, modelImageId))
      .returning();
    return await returnOne(query);
  }

  async count(tx: DatabaseTransaction, _input: CountInput) {
    const query = tx
      .select({ count: count() })
      .from(modelImageTable)
      .where(isNull(modelImageTable.deletedAt));
    const res = await returnOne(query);
    return res.count;
  }

  async create(tx: DatabaseTransaction, input: CreateInput<ModelImageInput>) {
    const query = tx.insert(modelImageTable).values(input).returning();
    return await returnOne(query);
  }

  async getAll(tx: DatabaseTransaction, { pagination }: GetAllInput) {
    const query = tx
      .select()
      .from(modelImageTable)
      .where(isNull(modelImageTable.deletedAt))
      .orderBy(modelImageTable.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return await query.execute();
  }

  async getAllByModelId(tx: DatabaseTransaction, id: ModelID) {
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

  async getById(tx: DatabaseTransaction, id: ModelImageID) {
    const query = tx
      .select()
      .from(modelImageTable)
      .where(eq(modelImageTable.id, id));
    return await returnOne(query);
  }

  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<ModelImageInput>,
    modelImageId: ModelImageID,
  ) {
    const query = tx
      .update(modelImageTable)
      .set(input)
      .where(eq(modelImageTable.id, modelImageId))
      .returning();
    return await returnOne(query);
  }
}
