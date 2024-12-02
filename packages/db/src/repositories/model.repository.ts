import type { GetSelectInput } from "@repo/validators/server/dataTables.validators";
import type {
  CountModelsInput,
  GetAllModelsInput,
} from "@repo/validators/server/models.validators";

import { and, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";

import createMetadataFields from "../helpers/createMetadataFields";
import { db } from "../index";
import { createGlobalFilters } from "../mappings/model.mapper";
import {
  createAllModelsQuery,
  createModelsCountQuery,
} from "../queries/model.query";
import { equipmentTypeTable } from "../tables/equipment-type.sql";
import { manufacturerTable } from "../tables/manufacturer.sql";
import { modelImageTable } from "../tables/model-image.sql";
import {
  type ArchiveModel,
  type CreateModel,
  type ModelID,
  modelTable,
  type UpdateModel,
} from "../tables/model.sql";

const modelFields = getTableColumns(modelTable);

export function getAllModels(
  { filters, ...dataTableInput }: GetAllModelsInput,
  organizationId: OrganizationID,
) {
  const query = createAllModelsQuery(
    dataTableInput,
    isNull(modelTable.deletedAt),
    eq(modelTable.organizationId, organizationId),
    filters?.manufacturerId
      ? eq(modelTable.manufacturerId, filters.manufacturerId)
      : undefined,
    filters?.equipmentTypeId
      ? eq(modelTable.equipmentTypeId, filters.equipmentTypeId)
      : undefined,
  );
  return query.execute();
}

export async function countModels(
  { filters, ...dataTableInput }: CountModelsInput,
  organizationId: OrganizationID,
) {
  const query = createModelsCountQuery(
    dataTableInput,
    isNull(modelTable.deletedAt),
    eq(modelTable.organizationId, organizationId),
    filters?.manufacturerId
      ? eq(modelTable.manufacturerId, filters.manufacturerId)
      : undefined,
    filters?.equipmentTypeId
      ? eq(modelTable.equipmentTypeId, filters.equipmentTypeId)
      : undefined,
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
  const { createdByTable, deletedByTable, metadata, updatedByTable } =
    createMetadataFields();

  const query = db
    .select({
      ...modelFields,
      manufacturer: manufacturerTable,
      equipmentType: equipmentTypeTable,
      imageUrl: modelImageTable.url,
      ...metadata,
    })
    .from(modelTable)
    .innerJoin(createdByTable, eq(modelTable.createdById, createdByTable.id))
    .leftJoin(updatedByTable, eq(modelTable.updatedById, updatedByTable.id))
    .leftJoin(deletedByTable, eq(modelTable.deletedById, deletedByTable.id))
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
