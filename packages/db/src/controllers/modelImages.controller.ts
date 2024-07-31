import { and, count, eq, isNull } from "drizzle-orm";
import { type Database } from "../index";
import {
  type DeleteModelImage,
  modelImages,
  type CreateModelImage,
  type UpdateModelImage,
  type ModelImageID,
} from "../schemas/model-images.schema";
import { type GetAll, type GetCount } from "../helpers/types";
import { type ModelID } from "../schemas/models.schema";

export default {
  getAll({ pagination }: GetAll, db: Database) {
    const query = db
      .select()
      .from(modelImages)
      .where(isNull(modelImages.deletedAt))
      .orderBy(modelImages.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  },
  async getAllByModelId(id: ModelID, db: Database) {
    const query = db
      .select()
      .from(modelImages)
      .where(and(isNull(modelImages.deletedAt), eq(modelImages.modelId, id)))
      .orderBy(modelImages.id);
    const res = await query.execute();
    return res;
  },
  async getCount(_: GetCount, db: Database) {
    const query = db
      .select({ count: count() })
      .from(modelImages)
      .where(isNull(modelImages.deletedAt));
    const [res] = await query.execute();
    return res?.count;
  },
  async getById(id: ModelImageID, db: Database) {
    const query = db.select().from(modelImages).where(eq(modelImages.id, id));
    const [res] = await query.execute();
    return res;
  },
  async create(input: CreateModelImage, db: Database) {
    const query = db.insert(modelImages).values(input).returning();
    const [res] = await query.execute();
    return res;
  },
  async update(input: UpdateModelImage, db: Database) {
    const query = db
      .update(modelImages)
      .set(input)
      .where(eq(modelImages.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },

  async delete(input: DeleteModelImage, db: Database) {
    const query = db
      .update(modelImages)
      .set(input)
      .where(eq(modelImages.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },
};
