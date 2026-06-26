import { and, count, eq, getTableColumns, isNull } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.table";
import type {
  ArchiveInput,
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "./types";

import { type DatabaseTransaction } from "../db";
import createMetadataFields from "../helpers/createMetadataFields";
import { returnOne } from "../helpers/executeQuery";
import {
  createGlobalFilters,
  createSortOrder,
} from "../mappings/equipmentType.mapper";
import {
  type EquipmentTypeID,
  type EquipmentTypeInput,
  equipmentTypeTable,
} from "../tables/equipmentType.table";

const equipmentTypeFields = getTableColumns(equipmentTypeTable);

export default class EquipmentTypeRepository {
  async archive(
    tx: DatabaseTransaction,
    input: ArchiveInput<EquipmentTypeInput>,
    localId: number,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(equipmentTypeTable)
      .set(input)
      .where(
        and(
          eq(equipmentTypeTable.localId, localId),
          eq(equipmentTypeTable.organizationId, organizationId),
        ),
      )
      .returning();
    return await returnOne(query);
  }

  async count(
    tx: DatabaseTransaction,
    { globalFilter }: CountInput,
    organizationId: OrganizationID,
  ) {
    const globalFilterParams = createGlobalFilters(globalFilter);
    const query = tx
      .select({ count: count() })
      .from(equipmentTypeTable)
      .where(
        and(
          globalFilterParams,
          isNull(equipmentTypeTable.deletedAt),
          eq(equipmentTypeTable.organizationId, organizationId),
        ),
      );
    const res = await returnOne(query);
    return res.count;
  }

  async create(
    tx: DatabaseTransaction,
    input: CreateInput<EquipmentTypeInput>,
  ) {
    const query = tx.insert(equipmentTypeTable).values(input).returning();
    return await returnOne(query);
  }

  async getAll(
    tx: DatabaseTransaction,
    { pagination, globalFilter, sorting }: GetAllInput,
    organizationId: OrganizationID,
  ) {
    const globalFilterParams = createGlobalFilters(globalFilter);
    const orderByParams = createSortOrder(sorting);
    const query = tx
      .select()
      .from(equipmentTypeTable)
      .where(
        and(
          globalFilterParams,
          isNull(equipmentTypeTable.deletedAt),
          eq(equipmentTypeTable.organizationId, organizationId),
        ),
      )
      .orderBy(...orderByParams, equipmentTypeTable.id)
      .limit(pagination.pageSize)
      .offset(pagination.pageIndex * pagination.pageSize);
    return await query.execute();
  }

  async getAllSimple(
    tx: DatabaseTransaction,
    _input: GetAllSimpleInput,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .select({
        value: equipmentTypeTable.localId,
        label: equipmentTypeTable.name,
      })
      .from(equipmentTypeTable)
      .where(
        and(
          isNull(equipmentTypeTable.deletedAt),
          eq(equipmentTypeTable.organizationId, organizationId),
        ),
      );
    return query.execute();
  }

  async getById(tx: DatabaseTransaction, input: EquipmentTypeID) {
    const { createdByTable, updatedByTable, deletedByTable, metadata } =
      createMetadataFields();
    const query = tx
      .select({
        ...equipmentTypeFields,
        ...metadata,
      })
      .from(equipmentTypeTable)
      .innerJoin(
        createdByTable,
        eq(equipmentTypeTable.createdById, createdByTable.id),
      )
      .leftJoin(
        updatedByTable,
        eq(equipmentTypeTable.updatedById, updatedByTable.id),
      )
      .leftJoin(
        deletedByTable,
        eq(equipmentTypeTable.deletedById, deletedByTable.id),
      )
      .where(eq(equipmentTypeTable.id, input));
    return await returnOne(query);
  }

  async getByLocalId(
    tx: DatabaseTransaction,
    localId: number,
    organizationId: OrganizationID,
  ) {
    const { createdByTable, updatedByTable, deletedByTable, metadata } =
      createMetadataFields();
    const query = tx
      .select({
        ...equipmentTypeFields,
        ...metadata,
      })
      .from(equipmentTypeTable)
      .innerJoin(
        createdByTable,
        eq(equipmentTypeTable.createdById, createdByTable.id),
      )
      .leftJoin(
        updatedByTable,
        eq(equipmentTypeTable.updatedById, updatedByTable.id),
      )
      .leftJoin(
        deletedByTable,
        eq(equipmentTypeTable.deletedById, deletedByTable.id),
      )
      .where(
        and(
          eq(equipmentTypeTable.localId, localId),
          eq(equipmentTypeTable.organizationId, organizationId),
        ),
      );
    return await returnOne(query);
  }

  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<EquipmentTypeInput>,
    localId: number,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(equipmentTypeTable)
      .set(input)
      .where(
        and(
          eq(equipmentTypeTable.localId, localId),
          eq(equipmentTypeTable.organizationId, organizationId),
        ),
      )
      .returning();
    return await returnOne(query);
  }
}
