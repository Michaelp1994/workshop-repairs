import { eq, sql } from "drizzle-orm";

import type { OrganizationID } from "../tables/organization.table";
import type { CreateInput, UpdateInput } from "../types";

import { type DatabaseTransaction } from "..";
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
    const [res] = await query.execute();
    return res;
  }

  async getByOrganizationId(tx: DatabaseTransaction, id: OrganizationID) {
    const query = tx
      .select()
      .from(organizationSequenceTable)
      .where(eq(organizationSequenceTable.organizationId, id));
    const [res] = await query.execute();
    return res;
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
    const [res] = await query.execute();
    return res;
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
    const [res] = await query.execute();
    return res;
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
    const [res] = await query.execute();
    return res;
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
    const [res] = await query.execute();
    return res;
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
    const [res] = await query.execute();
    return res;
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
    const [res] = await query.execute();
    return res;
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
    const [res] = await query.execute();
    return res;
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
    const [res] = await query.execute();
    return res;
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
    const [res] = await query.execute();
    return res;
  }
}
