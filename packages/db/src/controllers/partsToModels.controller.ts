import { and, count, eq, getTableColumns } from "drizzle-orm";

import { db } from "..";
import { getColumnFilterParams } from "../helpers/getColumnFilters";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { type GetAll, type GetCount, type GetSelect } from "../helpers/types";
import {
  partsToModelsFilterMapping,
  partsToModelsOrderMapping,
} from "../mappings/partsToModels.mappings";
import { type ModelID, modelTable } from "../schemas/model.table";
import { type PartID, partTable } from "../schemas/part.table";
import {
  type ArchivePartToModel,
  type CreatePartToModel,
  partsToModelTable,
  UpdatePartToModel,
} from "../schemas/parts-to-model.table";

const globalFilterColumns = [
  partTable.name,
  partTable.partNumber,
  modelTable.name,
];

const partsToModelsFields = getTableColumns(partsToModelTable);

export function getAll({
  sorting,
  pagination,
  globalFilter,
  columnFilters,
}: GetAll) {
  const globalFilterParams = getGlobalFilterParams(
    globalFilter,
    globalFilterColumns,
  );
  const columnFilterParams = getColumnFilterParams(
    columnFilters,
    partsToModelsFilterMapping,
  );

  const orderByParams = getOrderByParams(sorting, partsToModelsOrderMapping);

  const query = db
    .select({
      ...partsToModelsFields,
      part: {
        name: partTable.name,
        partNumber: partTable.partNumber,
      },
      model: {
        name: modelTable.name,
      },
    })
    .from(partsToModelTable)
    .innerJoin(partTable, eq(partTable.id, partsToModelTable.partId))
    .innerJoin(modelTable, eq(modelTable.id, partsToModelTable.modelId))
    .where(and(globalFilterParams, ...columnFilterParams))
    .orderBy(...orderByParams, partTable.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  const res = query.execute();
  return res;
}

export async function getCount({ columnFilters, globalFilter }: GetCount) {
  const globalFilterParams = getGlobalFilterParams(
    globalFilter,
    globalFilterColumns,
  );
  const columnFilterParams = getColumnFilterParams(
    columnFilters,
    partsToModelsFilterMapping,
  );
  const query = db
    .select({
      count: count(),
    })
    .from(partsToModelTable)
    .innerJoin(partTable, eq(partTable.id, partsToModelTable.partId))
    .innerJoin(modelTable, eq(modelTable.id, partsToModelTable.modelId))
    .where(and(globalFilterParams, ...columnFilterParams));
  const [res] = await query.execute();
  return res?.count;
}

export function getSelect({ globalFilter, columnFilters }: GetSelect) {
  const globalFilterParams = getGlobalFilterParams(
    globalFilter,
    globalFilterColumns,
  );
  const columnFilterParams = getColumnFilterParams(
    columnFilters,
    partsToModelsFilterMapping,
  );
  const query = db
    .select({
      value: partTable.id,
      label: partTable.name,
    })
    .from(partsToModelTable)
    .innerJoin(partTable, eq(partTable.id, partsToModelTable.partId))
    .innerJoin(modelTable, eq(modelTable.id, partsToModelTable.modelId))
    .where(and(globalFilterParams, ...columnFilterParams));

  return query.execute();
}

export async function getById(input: { partId: PartID; modelId: ModelID }) {
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

export async function create(input: CreatePartToModel) {
  const query = db.insert(partsToModelTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function update(input: UpdatePartToModel) {
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

export async function archive(input: ArchivePartToModel) {
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
