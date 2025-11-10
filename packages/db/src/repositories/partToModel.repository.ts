import type { GetSelectInput } from "@repo/validators/server/dataTables.validators";
import type {
  CountAllModelsByPartIdInput,
  CountAllPartsByModelIdInput,
  GetAllModelsByPartIdInput,
  GetAllPartsByModelIdInput,
} from "@repo/validators/server/partsToModel.validators";

import { and, count, eq, getTableColumns } from "drizzle-orm";

import type { ArchiveInput, CreateInput, UpdateInput } from "../types";

import { type DatabaseTransaction } from "..";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/partsToModels.mapper";
import { type ModelID, modelTable } from "../tables/model.sql";
import { type PartID, partTable } from "../tables/part.sql";
import {
  partsToModelTable,
  type PartToModelInput,
} from "../tables/parts-to-model.sql";

const partsToModelsFields = getTableColumns(partsToModelTable);

export function getAllPartsByModelId(
  tx: DatabaseTransaction,
  {
    sorting,
    pagination,
    globalFilter,
    columnFilters,
    filters,
  }: GetAllPartsByModelIdInput,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const orderByParams = getOrderBy(sorting);
  const query = tx
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

export async function countAllPartsByModelId(
  tx: DatabaseTransaction,
  { columnFilters, globalFilter, filters }: CountAllPartsByModelIdInput,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const query = tx
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

export function getAllModelsByPartId(
  tx: DatabaseTransaction,
  {
    sorting,
    pagination,
    globalFilter,
    columnFilters,
    filters,
  }: GetAllModelsByPartIdInput,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const orderByParams = getOrderBy(sorting);
  const query = tx
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

export async function countAllModelsByPartId(
  tx: DatabaseTransaction,
  { columnFilters, globalFilter, filters }: CountAllModelsByPartIdInput,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const query = tx
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
  tx: DatabaseTransaction,
  { globalFilter, columnFilters }: GetSelectInput,
  modelId: ModelID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const query = tx
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
  tx: DatabaseTransaction,
  { globalFilter, columnFilters }: GetSelectInput,
  partId: PartID,
) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
  const query = tx
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

export async function getPartToModelById(
  tx: DatabaseTransaction,
  input: {
    partId: PartID;
    modelId: ModelID;
  },
) {
  const query = tx
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

export async function createPartToModel(
  tx: DatabaseTransaction,
  input: CreateInput<PartToModelInput>,
) {
  const query = tx.insert(partsToModelTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updatePartToModel(
  tx: DatabaseTransaction,
  input: UpdateInput<PartToModelInput>,
) {
  const query = tx
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

export async function archivePartToModel(
  tx: DatabaseTransaction,
  input: ArchiveInput<PartToModelInput>,
) {
  const query = tx
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
