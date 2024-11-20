import type {
  GetAllInput,
  GetCountInput,
  GetSelectInput,
} from "@repo/validators/dataTables.validators";

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

export function getAll({
  sorting,
  pagination,
  globalFilter,
  columnFilters,
}: GetAllInput) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);

  const orderByParams = getOrderBy(sorting);

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

export async function getCount({ columnFilters, globalFilter }: GetCountInput) {
  const globalFilterParams = getGlobalFilters(globalFilter);
  const columnFilterParams = getColumnFilters(columnFilters);
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

export function getSelect({ globalFilter, columnFilters }: GetSelectInput) {
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
