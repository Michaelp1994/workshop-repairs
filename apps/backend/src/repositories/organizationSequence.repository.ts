import { eq, sql } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.table";
import type { CreateInput, UpdateInput } from "../types";

import { type DatabaseTransaction } from "../db";
import { returnOne } from "../helpers/executeQuery";
import {
  type OrganizationSequenceID,
  type OrganizationSequenceInput,
  organizationSequenceTable,
} from "../tables/organizationSequences.table";

export default class OrganizationSequenceRepository {
  async create(
    tx: DatabaseTransaction,
    input: CreateInput<OrganizationSequenceInput>,
  ) {
    const query = tx
      .insert(organizationSequenceTable)
      .values(input)
      .returning();

    return returnOne(query);
  }

  async getByOrganizationId(tx: DatabaseTransaction, id: OrganizationID) {
    const query = tx
      .select()
      .from(organizationSequenceTable)
      .where(eq(organizationSequenceTable.organizationId, id));
    return await returnOne(query);
  }

  async incrementAssetSequence(
    tx: DatabaseTransaction,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(organizationSequenceTable)
      .set({
        assetLastUsedValue: sql`${organizationSequenceTable.assetLastUsedValue} + 1`,
      })
      .where(eq(organizationSequenceTable.organizationId, organizationId))
      .returning();
    return await returnOne(query);
  }

  async incrementClientSequence(
    tx: DatabaseTransaction,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(organizationSequenceTable)
      .set({
        clientLastUsedValue: sql`${organizationSequenceTable.clientLastUsedValue} + 1`,
      })
      .where(eq(organizationSequenceTable.organizationId, organizationId))
      .returning();
    return await returnOne(query);
  }

  async incrementEquipmentTypeSequence(
    tx: DatabaseTransaction,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(organizationSequenceTable)
      .set({
        equipmentTypeLastUsedValue: sql`${organizationSequenceTable.equipmentTypeLastUsedValue} + 1`,
      })
      .where(eq(organizationSequenceTable.organizationId, organizationId))
      .returning();
    return await returnOne(query);
  }

  async incrementLocationSequence(
    tx: DatabaseTransaction,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(organizationSequenceTable)
      .set({
        locationLastUsedValue: sql`${organizationSequenceTable.locationLastUsedValue} + 1`,
      })
      .where(eq(organizationSequenceTable.organizationId, organizationId))
      .returning();
    return await returnOne(query);
  }

  async incrementManufacturerSequence(
    tx: DatabaseTransaction,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(organizationSequenceTable)
      .set({
        manufacturerLastUsedValue: sql`${organizationSequenceTable.manufacturerLastUsedValue} + 1`,
      })
      .where(eq(organizationSequenceTable.organizationId, organizationId))
      .returning();
    return await returnOne(query);
  }

  async incrementModelSequence(
    tx: DatabaseTransaction,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(organizationSequenceTable)
      .set({
        modelLastUsedValue: sql`${organizationSequenceTable.modelLastUsedValue} + 1`,
      })
      .where(eq(organizationSequenceTable.organizationId, organizationId))
      .returning();
    return await returnOne(query);
  }

  async incrementPartSequence(
    tx: DatabaseTransaction,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(organizationSequenceTable)
      .set({
        partLastUsedValue: sql`${organizationSequenceTable.partLastUsedValue} + 1`,
      })
      .where(eq(organizationSequenceTable.organizationId, organizationId))
      .returning();
    return await returnOne(query);
  }

  async incrementRepairSequence(
    tx: DatabaseTransaction,
    organizationId: OrganizationID,
  ) {
    const query = tx
      .update(organizationSequenceTable)
      .set({
        repairLastUsedValue: sql`${organizationSequenceTable.repairLastUsedValue} + 1`,
      })
      .where(eq(organizationSequenceTable.organizationId, organizationId))
      .returning();
    return await returnOne(query);
  }

  async update(
    tx: DatabaseTransaction,
    input: UpdateInput<OrganizationSequenceInput>,
    organizationSequenceId: OrganizationSequenceID,
  ) {
    const query = tx
      .update(organizationSequenceTable)
      .set(input)
      .where(eq(organizationSequenceTable.id, organizationSequenceId))
      .returning();
    return await returnOne(query);
  }
}
