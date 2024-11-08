import { and, count, eq, getTableColumns, ilike, isNull } from "drizzle-orm";

import type { OrganizationID } from "../schemas/organizations.schema";

import { formatSearch } from "../helpers/formatSearch";
import { getColumnFilterParams } from "../helpers/getColumnFilters";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import { db } from "../index";
import {
  modelFilterMapping,
  modelOrderMapping,
} from "../mappings/model.mappings";
import { equipmentTypes } from "../schemas/equipment-types.schema";
import { manufacturers } from "../schemas/manufacturers.schema";
import { modelImages } from "../schemas/model-images.schema";
import {
  type ArchiveModel,
  type CreateModel,
  type ModelID,
  models,
  type UpdateModel,
} from "../schemas/models.schema";

const modelFields = getTableColumns(models);

const globalFilterColumns = [models.name, models.nickname, manufacturers.name];

export function getAll(
  { pagination, globalFilter, sorting, columnFilters }: GetAll,
  organizationId: OrganizationID,
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
      equipmentType: {
        id: equipmentTypes.id,
        name: equipmentTypes.name,
      },
      manufacturer: {
        id: manufacturers.id,
        name: manufacturers.name,
      },
      createdAt: models.createdAt,
      updatedAt: models.updatedAt,
    })
    .from(models)
    .innerJoin(manufacturers, eq(models.manufacturerId, manufacturers.id))
    .innerJoin(equipmentTypes, eq(models.equipmentTypeId, equipmentTypes.id))
    .leftJoin(modelImages, eq(models.defaultImageId, modelImages.id))
    .where(
      and(
        isNull(models.deletedAt),
        eq(models.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    )
    .orderBy(...orderByParams, models.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  return query.execute();
}

export async function getCount(
  { globalFilter, columnFilters }: GetCount,
  organizationId: OrganizationID,
) {
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
        eq(models.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    );

  const [res] = await query.execute();
  return res?.count;
}

export function getSelect(
  { globalFilter = "" }: GetSelect,
  organizationId: OrganizationID,
) {
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
        eq(models.organizationId, organizationId),
        globalFilter !== "" ? ilike(models.name, searchQuery) : undefined,
      ),
    )
    .orderBy(models.id);
  const res = query.execute();
  return res;
}

export async function getById(id: ModelID) {
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
}

export async function create(input: CreateModel) {
  const query = db.insert(models).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateModel) {
  const query = db
    .update(models)
    .set(input)
    .where(eq(models.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveModel) {
  const query = db
    .update(models)
    .set(input)
    .where(eq(models.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
