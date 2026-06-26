import { and, count, eq, getTableColumns } from "drizzle-orm";

import type {
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "./types";

import { type DatabaseTransaction } from "../db";
import { returnOne } from "../helpers/executeQuery";
import {
  getColumnFilters,
  getGlobalFilters,
  getOrderBy,
} from "../mappings/partsToModels.mapper";
import { type ModelID, modelTable } from "../tables/model.table";
import { type PartID, partTable } from "../tables/part.table";
import {
  type PartToModelInput,
  partToModelTable,
} from "../tables/partToModel.table";

const partToModelsFields = getTableColumns(partToModelTable);

export interface PartToModelFilters {
  modelId: number;
}

export interface ModelToPartFilter {
  partId: number;
}

export default class PartToModelRepository {
  // TODO: should this be a delete operation or an archive operation?
  async archive(
    tx: DatabaseTransaction,
    { partId, modelId }: { partId: PartID; modelId: ModelID },
  ) {
    const query = tx
      .delete(partToModelTable)
      .where(
        and(
          eq(partToModelTable.partId, partId),
          eq(partToModelTable.modelId, modelId),
        ),
      )
      .returning();
    return await returnOne(query);
  }

  async countAllModelsByPartId(
    tx: DatabaseTransaction,
    { columnFilters, globalFilter, filters }: CountInput<ModelToPartFilter>,
  ) {
    const globalFilterParams = getGlobalFilters(globalFilter);
    const columnFilterParams = getColumnFilters(columnFilters);
    const query = tx
      .select({
        count: count(),
      })
      .from(partToModelTable)
      .innerJoin(modelTable, eq(modelTable.id, partToModelTable.modelId))
      .where(
        and(
          eq(partToModelTable.partId, filters.partId),
          globalFilterParams,
          ...columnFilterParams,
        ),
      );
    const res = await returnOne(query);
    return res.count;
  }

  async countAllPartsByModelId(
    tx: DatabaseTransaction,
    { columnFilters, globalFilter, filters }: CountInput<PartToModelFilters>,
  ) {
    const globalFilterParams = getGlobalFilters(globalFilter);
    const columnFilterParams = getColumnFilters(columnFilters);
    const query = tx
      .select({
        count: count(),
      })
      .from(partToModelTable)
      .innerJoin(partTable, eq(partTable.id, partToModelTable.partId))
      .where(
        and(
          eq(partToModelTable.modelId, filters.modelId),
          globalFilterParams,
          ...columnFilterParams,
        ),
      );
    const res = await returnOne(query);
    return res.count;
  }

  async create(tx: DatabaseTransaction, input: CreateInput<PartToModelInput>) {
    const query = tx.insert(partToModelTable).values(input).returning();
    return await returnOne(query);
  }

  async getAllModelsByPartId(
    tx: DatabaseTransaction,
    {
      sorting,
      pagination,
      globalFilter,
      columnFilters,
      filters,
    }: GetAllInput<ModelToPartFilter>,
  ) {
    const globalFilterParams = getGlobalFilters(globalFilter);
    const columnFilterParams = getColumnFilters(columnFilters);
    const orderByParams = getOrderBy(sorting);
    const query = tx
      .select({
        ...partToModelsFields,
        model: modelTable,
      })
      .from(partToModelTable)
      .innerJoin(modelTable, eq(modelTable.id, partToModelTable.modelId))
      .where(
        and(
          eq(partToModelTable.partId, filters.partId),
          globalFilterParams,
          ...columnFilterParams,
        ),
      )
      .orderBy(...orderByParams, partToModelTable.partId)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    const res = query.execute();
    return res;
  }

  async getAllPartsByModelId(
    tx: DatabaseTransaction,
    {
      sorting,
      pagination,
      globalFilter,
      columnFilters,
      filters,
    }: GetAllInput<PartToModelFilters>,
  ) {
    const globalFilterParams = getGlobalFilters(globalFilter);
    const columnFilterParams = getColumnFilters(columnFilters);
    const orderByParams = getOrderBy(sorting);
    const query = tx
      .select({
        ...partToModelsFields,
        part: partTable,
      })
      .from(partToModelTable)
      .innerJoin(partTable, eq(partTable.id, partToModelTable.partId))
      .where(
        and(
          eq(partToModelTable.modelId, filters.modelId),
          globalFilterParams,
          ...columnFilterParams,
        ),
      )
      .orderBy(...orderByParams, partToModelTable.partId)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    const res = query.execute();
    return res;
  }

  async getById(
    tx: DatabaseTransaction,
    input: {
      partId: PartID;
      modelId: ModelID;
    },
  ) {
    const query = tx
      .select()
      .from(partToModelTable)
      .where(
        and(
          eq(partToModelTable.partId, input.partId),
          eq(partToModelTable.modelId, input.modelId),
        ),
      );
    return await returnOne(query);
  }

  async getModelsByPartIdSelect(
    tx: DatabaseTransaction,
    { globalFilter, columnFilters }: GetAllSimpleInput,
    partId: PartID,
  ) {
    const globalFilterParams = getGlobalFilters(globalFilter);
    const columnFilterParams = getColumnFilters(columnFilters);
    const query = tx
      .select({
        value: modelTable.id,
        label: modelTable.name,
      })
      .from(partToModelTable)
      .innerJoin(partTable, eq(partTable.id, partToModelTable.partId))
      .innerJoin(modelTable, eq(modelTable.id, partToModelTable.modelId))
      .where(
        and(
          eq(partToModelTable.partId, partId),
          globalFilterParams,
          ...columnFilterParams,
        ),
      );

    return query.execute();
  }

  async getPartsByModelIdSelect(
    tx: DatabaseTransaction,
    { globalFilter, columnFilters }: GetAllSimpleInput,
    modelId: ModelID,
  ) {
    const globalFilterParams = getGlobalFilters(globalFilter);
    const columnFilterParams = getColumnFilters(columnFilters);
    const query = tx
      .select({
        value: partTable.id,
        label: partTable.name,
      })
      .from(partToModelTable)
      .innerJoin(partTable, eq(partTable.id, partToModelTable.partId))
      .innerJoin(modelTable, eq(modelTable.id, partToModelTable.modelId))
      .where(
        and(
          eq(partToModelTable.modelId, modelId),
          globalFilterParams,
          ...columnFilterParams,
        ),
      );

    return query.execute();
  }

  // TODO: refactor type of input
  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<PartToModelInput>,
    { partId, modelId }: { partId: PartID; modelId: ModelID },
  ) {
    const query = tx
      .update(partToModelTable)
      .set(input)
      .where(
        and(
          eq(partToModelTable.partId, partId),
          eq(partToModelTable.modelId, modelId),
        ),
      )
      .returning();
    return await returnOne(query);
  }
}
