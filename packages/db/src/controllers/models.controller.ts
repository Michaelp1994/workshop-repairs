import type {
  GetAllInput,
  GetCountInput,
  GetSelectInput,
} from "@repo/validators/dataTables.validators";

import { and, eq, getTableColumns, ilike, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.sql";

import { formatSearch } from "../helpers/formatSearch";
import { db } from "../index";
import { baseCountQuery, baseModelDataQuery } from "../queries/models.queries";
import {
  type EquipmentTypeID,
  equipmentTypeTable,
} from "../tables/equipment-type.sql";
import {
  type ManufacturerID,
  manufacturerTable,
} from "../tables/manufacturer.sql";
import {
  type ArchiveModel,
  type CreateModel,
  type ModelID,
  modelTable,
  type UpdateModel,
} from "../tables/model.sql";
import { modelImageTable } from "../tables/model-image.sql";

const modelFields = getTableColumns(modelTable);

export function getAll(
  dataTableParams: GetAllInput,
  organizationId: OrganizationID,
) {
  const query = baseModelDataQuery(
    dataTableParams,
    isNull(modelTable.deletedAt),
    eq(modelTable.organizationId, organizationId),
  );
  return query.execute();
}

export async function getCount(
  dataTableParams: GetCountInput,
  organizationId: OrganizationID,
) {
  const query = baseCountQuery(
    dataTableParams,
    isNull(modelTable.deletedAt),
    eq(modelTable.organizationId, organizationId),
  );
  const [res] = await query.execute();
  return res?.count;
}

export function getAllByEquipmentTypeId(
  dataTableParams: GetAllInput,
  organizationId: OrganizationID,
  equipmentTypeId: EquipmentTypeID,
) {
  const query = baseModelDataQuery(
    dataTableParams,
    isNull(modelTable.deletedAt),
    eq(modelTable.organizationId, organizationId),
    eq(equipmentTypeTable.id, equipmentTypeId),
  );
  return query.execute();
}

export async function getCountByEquipmentTypeId(
  dataTableParams: GetCountInput,
  organizationId: OrganizationID,
  equipmentTypeId: EquipmentTypeID,
) {
  const query = baseCountQuery(
    dataTableParams,
    isNull(modelTable.deletedAt),
    eq(modelTable.organizationId, organizationId),
    eq(equipmentTypeTable.id, equipmentTypeId),
  );
  const [res] = await query.execute();
  return res?.count;
}

export function getAllByManufacturerId(
  dataTableParams: GetAllInput,
  organizationId: OrganizationID,
  manufacturerId: ManufacturerID,
) {
  const query = baseModelDataQuery(
    dataTableParams,
    isNull(modelTable.deletedAt),
    eq(modelTable.organizationId, organizationId),
    eq(manufacturerTable.id, manufacturerId),
  );
  return query.execute();
}

export async function getCountByManufacturerId(
  dataTableParams: GetCountInput,
  organizationId: OrganizationID,
  manufacturerId: ManufacturerID,
) {
  const query = baseCountQuery(
    dataTableParams,
    isNull(modelTable.deletedAt),
    eq(modelTable.organizationId, organizationId),
    eq(manufacturerTable.id, manufacturerId),
  );
  const [res] = await query.execute();
  return res?.count;
}

export function getSelect(
  { globalFilter = "" }: GetSelectInput,
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
