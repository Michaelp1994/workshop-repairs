import type {
  GetCountInput,
  GetSelectInput,
} from "@repo/validators/dataTables.validators";
import type { GetAllModelsInput } from "@repo/validators/models.validators";

import { and, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";

import { db } from "../index";
import {
  createCountQuery,
  createDataTableQuery,
  createGlobalFilters,
} from "../mappings/model.mapper";
import { manufacturerTable } from "../tables/manufacturer.sql";
import {
  type ArchiveModel,
  type CreateModel,
  type ModelID,
  modelTable,
  type UpdateModel,
} from "../tables/model.sql";
import { modelImageTable } from "../tables/model-image.sql";

const modelFields = getTableColumns(modelTable);

export function getAllModels(
  input: GetAllModelsInput,
  organizationId: OrganizationID,
) {
  const query = createDataTableQuery(
    input,
    isNull(modelTable.deletedAt),
    eq(modelTable.organizationId, organizationId),
  );
  return query.execute();
}

export async function getModelsCount(
  input: GetCountInput,
  organizationId: OrganizationID,
) {
  const query = createCountQuery(
    input,
    isNull(modelTable.deletedAt),
    eq(modelTable.organizationId, organizationId),
  );
  const [res] = await query.execute();
  return res?.count;
}

export function getModelsSelect(
  input: GetSelectInput,
  organizationId: OrganizationID,
) {
  const globalFilter = createGlobalFilters(input.globalFilter);
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
        globalFilter,
      ),
    )
    .orderBy(modelTable.id);
  const res = query.execute();
  return res;
}

export async function getModelById(id: ModelID) {
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

export async function createModel(input: CreateModel) {
  const query = db.insert(modelTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function updateModel(input: UpdateModel) {
  const query = db
    .update(modelTable)
    .set(input)
    .where(eq(modelTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function archiveModel(input: ArchiveModel) {
  const query = db
    .update(modelTable)
    .set(input)
    .where(eq(modelTable.id, input.id))
    .returning();
  const [res] = await query.execute();
  return res;
}
