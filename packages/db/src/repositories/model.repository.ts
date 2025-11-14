import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.table";
import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "../types";

import createMetadataFields from "../helpers/createMetadataFields";
import { type DatabaseTransaction } from "../index";
import {
  createColumnFilters,
  createGlobalFilters,
  createSortOrder,
} from "../mappings/model.mapper";
import { equipmentTypeTable } from "../tables/equipmentType.table";
import { manufacturerTable } from "../tables/manufacturer.table";
import { type ModelInput, modelTable } from "../tables/model.table";
import { modelImageTable } from "../tables/modelImage.table";

const modelFields = getTableColumns(modelTable);

interface ModelFilters {
  manufacturerId?: number;
  equipmentTypeId?: number;
}
export default class ModelRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<ModelInput>,
    localId: number,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(modelTable)
      .set(input)
      .where(
        and(
          eq(modelTable.localId, localId),
          eq(modelTable.organizationId, organizationId),
        ),
      )
      .returning();
    const [res] = await query.execute();
    return res;
  }

  async count(
    tx: DatabaseTransaction,
    { filters, globalFilter, columnFilters }: CountInput<ModelFilters>,
    organizationId: OrganizationID,
  ) {
    const globalFilterParams = createGlobalFilters(globalFilter);
    const columnFilterParams = createColumnFilters(columnFilters);
    const query = tx
      .select({ count: count() })
      .from(modelTable)
      .leftJoin(
        manufacturerTable,
        eq(modelTable.manufacturerId, manufacturerTable.id),
      )
      .innerJoin(
        equipmentTypeTable,
        eq(modelTable.equipmentTypeId, equipmentTypeTable.id),
      )
      .where(
        and(
          isNull(modelTable.deletedAt),
          eq(modelTable.organizationId, organizationId),
          filters.manufacturerId
            ? eq(modelTable.manufacturerId, filters.manufacturerId)
            : undefined,
          filters.equipmentTypeId
            ? eq(modelTable.equipmentTypeId, filters.equipmentTypeId)
            : undefined,
          globalFilterParams,
          ...columnFilterParams,
        ),
      );

    const [res] = await query.execute();
    return res?.count;
  }

  async create(tx: DatabaseTransaction, input: CreateInput<ModelInput>) {
    const query = tx.insert(modelTable).values(input).returning();
    const [res] = await query.execute();
    return res;
  }

  async getAll(
    tx: DatabaseTransaction,
    {
      filters,
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    }: GetAllInput<ModelFilters>,
    organizationId: OrganizationID,
  ) {
    const globalFilterParams = createGlobalFilters(globalFilter);
    const columnFilterParams = createColumnFilters(columnFilters);
    const orderByParams = createSortOrder(sorting);

    const query = tx
      .select({
        ...modelFields,
        defaultImageUrl: modelImageTable.url,
        equipmentType: equipmentTypeTable,
        manufacturer: manufacturerTable,
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
          filters.manufacturerId
            ? eq(modelTable.manufacturerId, filters.manufacturerId)
            : undefined,
          filters.equipmentTypeId
            ? eq(modelTable.equipmentTypeId, filters.equipmentTypeId)
            : undefined,
          globalFilterParams,
          ...columnFilterParams,
        ),
      )
      .orderBy(...orderByParams, modelTable.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);

    return query.execute();
  }

  async getAllSimple(
    tx: DatabaseTransaction,
    input: GetAllSimpleInput,
    organizationId: OrganizationID,
  ) {
    const globalFilter = createGlobalFilters(input.globalFilter);
    const query = tx
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

  async getByLocalId(
    tx: DatabaseTransaction,
    localId: number,
    organizationId: OrganizationID,
  ) {
    const { createdByTable, deletedByTable, metadata, updatedByTable } =
      createMetadataFields();

    const query = tx
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
      .where(
        and(
          eq(modelTable.localId, localId),
          eq(modelTable.organizationId, organizationId),
        ),
      );
    const [res] = await query.execute();
    return res;
  }

  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<ModelInput>,
    localId: number,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(modelTable)
      .set(input)
      .where(
        and(
          eq(modelTable.localId, localId),
          eq(modelTable.organizationId, organizationId),
        ),
      )
      .returning();
    const [res] = await query.execute();
    return res;
  }
}
