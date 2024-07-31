import { and, count, eq, getTableColumns } from "drizzle-orm";

import { getColumnFilterParams } from "../helpers/getColumnFilters";
import { getGlobalFilterParams } from "../helpers/getGlobalFilterParams";
import { getOrderByParams } from "../helpers/getOrderByParams";
import { type GetAll, type GetCount } from "../helpers/types";
import { type Database } from "../index";
import {
  partsToModelsFilterMapping,
  partsToModelsOrderMapping,
} from "../mappings/partsToModels.mappings";
import { type ModelID, models } from "../schemas/models.schema";
import { type PartID, parts } from "../schemas/parts.schema";
import {
  type CreatePartToModel,
  DeletePartToModel,
  partsToModels,
  UpdatePartToModel,
} from "../schemas/parts-to-models.schema";

const globalFilterColumns = [parts.name, parts.partNumber, models.name];

const partsToModelsFields = getTableColumns(partsToModels);

export function getAll(
  { sorting, pagination, globalFilter, columnFilters }: GetAll,
  db: Database,
) {
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
        name: parts.name,
        partNumber: parts.partNumber,
      },
      model: {
        name: models.name,
      },
    })
    .from(partsToModels)
    .leftJoin(parts, eq(parts.id, partsToModels.partId))
    .leftJoin(models, eq(models.id, partsToModels.modelId))
    .where(and(globalFilterParams, ...columnFilterParams))
    .orderBy(...orderByParams, parts.id)
    .limit(pagination.pageSize)
    .offset(pagination.pageIndex * pagination.pageSize);
  const res = query.execute();
  return res;
}
export async function getCount(
  { columnFilters, globalFilter }: GetCount,
  db: Database,
) {
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
    .from(partsToModels)
    .leftJoin(parts, eq(parts.id, partsToModels.partId))
    .leftJoin(models, eq(models.id, partsToModels.modelId))
    .where(and(globalFilterParams, ...columnFilterParams));
  const [res] = await query.execute();
  return res?.count;
}
export async function getById(
  input: { partId: PartID; modelId: ModelID },
  db: Database,
) {
  const query = db
    .select()
    .from(partsToModels)
    .where(
      and(
        eq(partsToModels.partId, input.partId),
        eq(partsToModels.modelId, input.modelId),
      ),
    );
  const [res] = await query.execute();
  return res;
}
export async function create(input: CreatePartToModel, db: Database) {
  const query = db.insert(partsToModels).values(input).returning();
  const [res] = await query.execute();
  return res;
}
export async function update(input: UpdatePartToModel, db: Database) {
  const query = db
    .update(partsToModels)
    .set(input)
    .where(
      and(
        eq(partsToModels.partId, input.partId),
        eq(partsToModels.modelId, input.modelId),
      ),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archive(input: DeletePartToModel, db: Database) {
  const query = db
    .delete(partsToModels)
    .where(
      and(
        eq(partsToModels.partId, input.partId),
        eq(partsToModels.modelId, input.modelId),
      ),
    )
    .returning();
  const [res] = await query.execute();
  return res;
}
