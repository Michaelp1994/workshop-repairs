import type { GetSelectInput } from "@repo/validators/server/dataTables.validators";
import type {
  CountAllModelsByPartIdInput,
  CountAllPartsByModelIdInput,
  GetAllModelsByPartIdInput,
  GetAllPartsByModelIdInput,
} from "@repo/validators/server/partsToModel.validators";

import { and, count, eq, getTableColumns } from "drizzle-orm";

import { db } from "..";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/partsToModels.mapper";
import { type ModelID, modelTable } from "../tables/model.sql";
import { type PartID, partTable } from "../tables/part.sql";
import {
  type ArchivePartToModel,
  type CreatePartToModel,
  partsToModelTable,
  UpdatePartToModel,
} from "../tables/parts-to-model.sql";

const partsToModelsFields = getTableColumns(partsToModelTable);

export function getAllPartsByModelId({
  sorting,
  pagination,
  globalFilter,
  columnFilters,
  filters,
}: GetAllPartsByModelIdInput) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const orderByParams = getOrderBy(sorting);
  const query = db
    .select({
      ...partsToModelsFields,
      part: partTable,
    })
    .from(partsToModelTable)
    .innerJoin(partTable, eq(partTable.id, partsToModelTable.partId))
    .where(
      and(
        eq(partsToModelTable.modelId, filters.modelId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    )
    .orderBy(...orderByParams, partsToModelTable.partId)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  const res = query.execute();
  return res;
}

export async function countAllPartsByModelId({
  columnFilters,
  globalFilter,
  filters,
}: CountAllPartsByModelIdInput) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const query = db
    .select({
      count: count(),
    })
    .from(partsToModelTable)
    .innerJoin(partTable, eq(partTable.id, partsToModelTable.partId))
    .where(
      and(
        eq(partsToModelTable.modelId, filters.modelId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    );
  const [res] = await query.execute();
  return res?.count;
}

export function getAllModelsByPartId({
  sorting,
  pagination,
  globalFilter,
  columnFilters,
  filters,
}: GetAllModelsByPartIdInput) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const orderByParams = getOrderBy(sorting);
  const query = db
    .select({
      ...partsToModelsFields,
      model: modelTable,
    })
    .from(partsToModelTable)
    .innerJoin(modelTable, eq(modelTable.id, partsToModelTable.modelId))
    .where(
      and(
        eq(partsToModelTable.partId, filters.partId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    )
    .orderBy(...orderByParams, partsToModelTable.partId)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  const res = query.execute();
  return res;
}

export async function countAllModelsByPartId({
  columnFilters,
  globalFilter,
  filters,
}: CountAllModelsByPartIdInput) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const query = db
    .select({
      count: count(),
    })
    .from(partsToModelTable)
    .innerJoin(modelTable, eq(modelTable.id, partsToModelTable.modelId))
    .where(
      and(
        eq(partsToModelTable.partId, filters.partId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    );
  const [res] = await query.execute();
  return res?.count;
}

export function getPartsByModelIdSelect(
  { globalFilter, columnFilters }: GetSelectInput,
  modelId: ModelID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const query = db
    .select({
      value: partTable.id,
      label: partTable.name,
    })
    .from(partsToModelTable)
    .innerJoin(partTable, eq(partTable.id, partsToModelTable.partId))
    .innerJoin(modelTable, eq(modelTable.id, partsToModelTable.modelId))
    .where(
      and(
        eq(partsToModelTable.modelId, modelId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    );

  return query.execute();
}

export function getModelsByPartIdSelect(
  { globalFilter, columnFilters }: GetSelectInput,
  partId: PartID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const query = db
    .select({
      value: modelTable.id,
      label: modelTable.name,
    })
    .from(partsToModelTable)
    .innerJoin(partTable, eq(partTable.id, partsToModelTable.partId))
    .innerJoin(modelTable, eq(modelTable.id, partsToModelTable.modelId))
    .where(
      and(
        eq(partsToModelTable.partId, partId),
        globalFilterParams,
        ...columnFilterParams,
      ),
    );

  return query.execute();
}

export async function getPartToModelById(input: {
  partId: PartID;
  modelId: ModelID;
}) {
  const query = db
    .select()
    .from(partsToModelTable)
    .where(
      and(
        eq(partsToModelTable.partId, input.partId),
        eq(partsToModelTable.modelId, input.modelId),
      ),
    );
  const [res] = await query.execute();
  return res;
}

export async function createPartToModel(input: CreatePartToModel) {
  const query = db.insert(partsToModelTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updatePartToModel(input: UpdatePartToModel) {
  const query = db
    .update(partsToModelTable)
    .set(input)
    .where(
      and(
        eq(partsToModelTable.partId, input.partId),
        eq(partsToModelTable.modelId, input.modelId),
      ),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archivePartToModel(input: ArchivePartToModel) {
  const query = db
    .delete(partsToModelTable)
    .where(
      and(
        eq(partsToModelTable.partId, input.partId),
        eq(partsToModelTable.modelId, input.modelId),
      ),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}
