import type {
  CountClientsInput,
  GetAllClientsInput,
  GetClientSelectInput,
} from "@repo/validators/server/clients.validators";

import { db } from "@repo/db";
import {
  archiveClient,
  countClients,
  createClient,
  getAllClients,
  getClientByLocalId,
  getClientsSelect,
  updateClient,
} from "@repo/db/repositories/client.repository";
import {
  getSequenceByOrganizationId,
  incrementClientSequence,
} from "@repo/db/repositories/organizationSequence.repository";

import type { ClientInput } from "../../../db/src/tables/client.sql";
import type { CreateInput, UpdateInput } from "../types";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import { createSlug } from "../helpers/slugs";

export async function getAllClientsService(
  input: GetAllClientsInput,
  session: OrganizationSession,
) {
  const sequence = await getSequenceByOrganizationId(
    db,
    session.organizationId,
  );

  assertDatabaseResult(sequence);

  const allClients = await getAllClients(db, input, session.organizationId);

  return allClients.map(({ localId, ...client }) => ({
    ...client,
    slug: createSlug(sequence.clientKeyPrefix, localId),
  }));
}

export async function countClientsService(
  input: CountClientsInput,
  session: OrganizationSession,
) {
  return countClients(db, input, session.organizationId);
}

export async function getClientsSelectService(
  input: GetClientSelectInput,
  session: OrganizationSession,
) {
  return getClientsSelect(db, input, session.organizationId);
}

export async function getClientService(
  localId: number,
  session: OrganizationSession,
) {
  return getClientByLocalId(db, localId, session.organizationId);
}

export async function createClientService(
  input: CreateInput<ClientInput>,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const sequence = await incrementClientSequence(tx, session.organizationId);
    const metadata = createInsertMetadata(session);

    assertDatabaseResult(sequence);

    const values = {
      ...input,
      ...metadata,
      localId: sequence.clientLastUsedValue,
    };
    const client = await createClient(tx, values);
    assertDatabaseResult(client);

    const slug = createSlug(sequence.clientKeyPrefix, client.localId);

    return {
      ...client,
      slug,
    };
  });
}

export async function updateClientService(
  input: UpdateInput<ClientInput>,
  localId: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createUpdateMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    const client = await updateClient(
      tx,
      values,
      localId,
      session.organizationId,
    );
    assertDatabaseResult(client);
    const sequence = await getSequenceByOrganizationId(
      tx,
      session.organizationId,
    );
    assertDatabaseResult(sequence);
    const slug = createSlug(sequence.clientKeyPrefix, localId);
    return {
      slug,
      ...client,
    };
  });
}

export async function archiveClientService(
  localId: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createArchiveMetadata(session);
    const archivedClient = await archiveClient(
      tx,
      metadata,
      localId,
      session.organizationId,
    );
    assertDatabaseResult(archivedClient);
    const sequence = await getSequenceByOrganizationId(
      tx,
      session.organizationId,
    );
    assertDatabaseResult(sequence);
    const slug = createSlug(sequence.assetKeyPrefix, localId);
    return { slug, ...archivedClient };
  });
}
