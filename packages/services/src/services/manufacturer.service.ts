import type {
  DataTableCountOutput,
  DataTableOutput,
  GetSelectInput,
} from "@repo/validators/server/dataTables.validators";

import { db } from "@repo/db";
import {
  archiveManufacturer,
  countManufacturers,
  createManufacturer,
  getAllManufacturers,
  getManufacturerByLocalId,
  getManufacturersSelect,
  updateManufacturer,
} from "@repo/db/repositories/manufacturer.repository";
import {
  getSequenceByOrganizationId,
  incrementManufacturerSequence,
} from "@repo/db/repositories/organizationSequence.repository";

import type { ManufacturerInput } from "../../../db/src/tables/manufacturer.sql";
import type { CreateInput, UpdateInput } from "../types";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import { createSlug } from "../helpers/slugs";

export async function getAllManufacturersService(
  input: DataTableOutput,
  session: OrganizationSession,
) {
  const sequence = await getSequenceByOrganizationId(
    db,
    session.organizationId,
  );

  assertDatabaseResult(sequence);
  const allManufacturers = await getAllManufacturers(
    db,
    input,
    session.organizationId,
  );
  return allManufacturers.map(({ localId, ...manufacturer }) => ({
    ...manufacturer,
    slug: createSlug(sequence.manufacturerKeyPrefix, localId),
  }));
}

export async function countManufacturersService(
  input: DataTableCountOutput,
  session: OrganizationSession,
) {
  return countManufacturers(db, input, session.organizationId);
}

export async function getManufacturersSelectService(
  input: GetSelectInput,
  session: OrganizationSession,
) {
  return getManufacturersSelect(db, input, session.organizationId);
}

export async function getManufacturerService(
  localId: number,
  session: OrganizationSession,
) {
  return getManufacturerByLocalId(db, localId, session.organizationId);
}

export async function createManufacturerService(
  input: CreateInput<ManufacturerInput>,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const sequence = await incrementManufacturerSequence(
      tx,
      session.organizationId,
    );
    assertDatabaseResult(sequence);
    const metadata = createInsertMetadata(session);
    const values = {
      localId: sequence.manufacturerLastUsedValue,
      ...metadata,
      ...input,
    };
    return createManufacturer(tx, values);
  });
}

export async function updateManufacturerService(
  input: UpdateInput<ManufacturerInput>,
  localId: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createUpdateMetadata(session);
    const values = {
      ...metadata,
      ...input,
    };
    const manufacturer = await updateManufacturer(
      tx,
      values,
      localId,
      session.organizationId,
    );
    assertDatabaseResult(manufacturer);
    const sequence = await getSequenceByOrganizationId(
      tx,
      session.organizationId,
    );
    assertDatabaseResult(sequence);
    const slug = createSlug(sequence.manufacturerKeyPrefix, localId);
    return {
      slug,
      ...manufacturer,
    };
  });
}

export async function archiveManufacturerService(
  localId: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createArchiveMetadata(session);
    const manufacturer = await archiveManufacturer(
      tx,
      metadata,
      localId,
      session.organizationId,
    );
    assertDatabaseResult(manufacturer);
    const sequence = await getSequenceByOrganizationId(
      tx,
      session.organizationId,
    );
    assertDatabaseResult(sequence);
    const slug = createSlug(sequence.manufacturerKeyPrefix, localId);
    return {
      slug,
      ...manufacturer,
    };
  });
}
