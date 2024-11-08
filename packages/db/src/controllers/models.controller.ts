import { and, count, eq, getTableColumns, ilike, isNull } from "drizzle-orm";

import type { OrganizationID } from "../schemas/organization.table";

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
import { equipmentTypeTable } from "../schemas/equipment-type.table";
import { manufacturerTable } from "../schemas/manufacturer.table";
import { modelImageTable } from "../schemas/model-image.table";
import {
  type ArchiveModel,
  type CreateModel,
  type ModelID,
  modelTable,
  type UpdateModel,
} from "../schemas/model.table";

const modelFields = getTableColumns(modelTable);

const globalFilterColumns = [
  modelTable.name,
  modelTable.nickname,
  manufacturerTable.name,
];

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
      id: modelTable.id,
      name: modelTable.name,
      nickname: modelTable.nickname,
      defaultImageUrl: modelImageTable.url,
      equipmentType: {
        id: equipmentTypeTable.id,
        name: equipmentTypeTable.name,
      },
      manufacturer: {
        id: manufacturerTable.id,
        name: manufacturerTable.name,
      },
      createdAt: modelTable.createdAt,
      updatedAt: modelTable.updatedAt,
    })
    .from(modelTable)
    .innerJoin(
      manufacturerTable,
      eq(modelTable.manufacturerId, manufacturerTable.id),
    )
    .innerJoin(
      equipmentTypeTable,
      eq(modelTable.equipmentTypeId, equipmentTypeTable.id),
    )
    .leftJoin(
      modelImageTable,
      eq(modelTable.defaultImageId, modelImageTable.id),
    )
    .where(
      and(
        isNull(modelTable.deletedAt),
        eq(modelTable.organizationId, organizationId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    )
    .orderBy(...orderByParams, modelTable.id)
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
    .from(modelTable)
    .leftJoin(
      manufacturerTable,
      eq(modelTable.manufacturerId, manufacturerTable.id),
    )
    .where(
      and(
        isNull(modelTable.deletedAt),
        eq(modelTable.organizationId, organizationId),
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
      value: modelTable.id,
      label: modelTable.name,
    })
    .from(modelTable)
    .where(
      and(
        isNull(modelTable.deletedAt),
        eq(modelTable.organizationId, organizationId),
        globalFilter !== "" ? ilike(modelTable.name, searchQuery) : undefined,
      ),
    )
    .orderBy(modelTable.id);
  const res = query.execute();
  return res;
}

export async function getById(id: ModelID) {
  const query = db
    .select({
      ...modelFields,
      manufacturer: {
        id: manufacturerTable.id,
        name: manufacturerTable.name,
      },
      imageUrl: modelImageTable.url,
    })
    .from(modelTable)
    .leftJoin(
      manufacturerTable,
      eq(modelTable.manufacturerId, manufacturerTable.id),
    )
    .leftJoin(
      modelImageTable,
      eq(modelTable.defaultImageId, modelImageTable.id),
    )
    .where(eq(modelTable.id, id));
  const [res] = await query.execute();
  return res;
}

export async function create(input: CreateModel) {
  const query = db.insert(modelTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdateModel) {
  const query = db
    .update(modelTable)
    .set(input)
    .where(eq(modelTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: ArchiveModel) {
  const query = db
    .update(modelTable)
    .set(input)
    .where(eq(modelTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
