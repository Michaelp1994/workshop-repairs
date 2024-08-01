import { and, count, eq, getTableColumns, ilike, isNull } from "drizzle-orm";

import { formatSearch } from "../helpers/formatSearch";
import { getColumnFilterParams } from "../helpers/getColumnFilters";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { type Database } from "../index";
import {
  modelFilterMapping,
  modelOrderMapping,
} from "../mappings/model.mappings";
import { manufacturers } from "../schemas/manufacturers.schema";
import { modelImages } from "../schemas/model-images.schema";
import {
  type ArchiveModel,
  type CreateModel,
  type ModelID,
  models,
  type UpdateModel,
} from "../schemas/models.schema";

const { ...modelFields } = getTableColumns(models);

const globalFilterColumns = [models.name, models.nickname, manufacturers.name];

export default {
  getAll(
    { pagination, globalFilter, sorting, columnFilters }: GetAll,
    db: Database,
  ) {
    const globalFilterParams = getGlobalFilterParams(
      globalFilter,
      globalFilterColumns,
    );
    const columnFilterParams = getColumnFilterParams(
      columnFilters,
      modelFilterMapping,
    );
    const orderByParams = getOrderByParams(sorting, modelOrderMapping);

    const query = db
      .select({
        id: models.id,
        name: models.name,
        nickname: models.nickname,
        defaultImageUrl: modelImages.url,
        manufacturer: {
          id: manufacturers.id,
          name: manufacturers.name,
        },
        createdAt: models.createdAt,
        updatedAt: models.updatedAt,
      })
      .from(models)
      .leftJoin(manufacturers, eq(models.manufacturerId, manufacturers.id))
      .leftJoin(modelImages, eq(models.defaultImageId, modelImages.id))
      .where(
        and(
          isNull(models.deletedAt),
          globalFilterParams,
          ...columnFilterParams,
        ),
      )
      .orderBy(...orderByParams, models.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return query.execute();
  },
  async getCount({ globalFilter, columnFilters }: GetCount, db: Database) {
    const globalFilterParams = getGlobalFilterParams(
      globalFilter,
      globalFilterColumns,
    );
    const columnFilterParams = getColumnFilterParams(
      columnFilters,
      modelFilterMapping,
    );

    const query = db
      .select({ count: count() })
      .from(models)
      .leftJoin(manufacturers, eq(models.manufacturerId, manufacturers.id))
      .where(
        and(
          isNull(models.deletedAt),
          globalFilterParams,
          ...columnFilterParams,
        ),
      );

    const [res] = await query.execute();
    return res?.count;
  },
  getSelect({ globalFilter = "" }: GetSelect, db: Database) {
    const searchQuery = formatSearch(globalFilter);

    const query = db
      .select({
        value: models.id,
        label: models.name,
      })
      .from(models)
      .where(
        and(
          isNull(models.deletedAt),
          globalFilter !== "" ? ilike(models.name, searchQuery) : undefined,
        ),
      )
      .orderBy(models.id);
    const res = query.execute();
    return res;
  },
  async getById(id: ModelID, db: Database) {
    const query = db
      .select({
        ...modelFields,
        manufacturer: {
          id: manufacturers.id,
          name: manufacturers.name,
        },
        imageUrl: modelImages.url,
      })
      .from(models)
      .leftJoin(manufacturers, eq(models.manufacturerId, manufacturers.id))
      .leftJoin(modelImages, eq(models.defaultImageId, modelImages.id))
      .where(eq(models.id, id));
    const [res] = await query.execute();
    return res;
  },
  async create(input: CreateModel, db: Database) {
    const query = db.insert(models).values(input).returning();
    const [res] = await query.execute();
    return res;
  },
  async update(input: UpdateModel, db: Database) {
    const query = db
      .update(models)
      .set(input)
      .where(eq(models.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },

  async archive(input: ArchiveModel, db: Database) {
    const query = db
      .update(models)
      .set(input)
      .where(eq(models.id, input.id))
      .returning();
    const [res] = await query.execute();
    return res;
  },
};
