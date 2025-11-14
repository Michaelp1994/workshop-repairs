import type {
  CountClientsInput,
  GetAllClientsInput,
  GetClientSelectInput,
} from "@repo/validators/server/clients.validators";

import { type Database } from "@repo/db";
import ClientRepository from "@repo/db/repositories/client.repository";
import OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";

import type { ClientInput } from "../../../db/src/tables/client.table";
import type { CreateInput, UpdateInput } from "../types";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import { createSlug } from "../helpers/slugs";

export default class ClientService {
  constructor(
    private db: Database,
    private clientRepository: ClientRepository,
    private organizationSequenceRepository: OrganizationSequenceRepository,
  ) {}

  async archiveClient(localId: number, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      const archivedClient = await this.clientRepository.archiveClient(
        tx,
        metadata,
        localId,
        session.organizationId,
      );
      assertDatabaseResult(archivedClient);
      const sequence =
        await this.organizationSequenceRepository.getSequenceByOrganizationId(
          tx,
          session.organizationId,
        );
      assertDatabaseResult(sequence);
      const slug = createSlug(sequence.assetKeyPrefix, localId);
      return { slug, ...archivedClient };
    });
  }

  async countClients(input: CountClientsInput, session: OrganizationSession) {
    return this.clientRepository.countClients(
      this.db,
      input,
      session.organizationId,
    );
  }

  async createClient(
    input: CreateInput<ClientInput>,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const sequence =
        await this.organizationSequenceRepository.incrementClientSequence(
          tx,
          session.organizationId,
        );
      const metadata = createInsertMetadata(session);

      assertDatabaseResult(sequence);

      const values = {
        ...input,
        ...metadata,
        localId: sequence.clientLastUsedValue,
      };
      const client = await this.clientRepository.createClient(tx, values);
      assertDatabaseResult(client);

      const slug = createSlug(sequence.clientKeyPrefix, client.localId);

      return {
        ...client,
        slug,
      };
    });
  }

  async getAllClients(input: GetAllClientsInput, session: OrganizationSession) {
    const sequence =
      await this.organizationSequenceRepository.getSequenceByOrganizationId(
        this.db,
        session.organizationId,
      );

    assertDatabaseResult(sequence);

    const allClients = await this.clientRepository.getAllClients(
      this.db,
      input,
      session.organizationId,
    );

    return allClients.map(({ localId, ...client }) => ({
      ...client,
      slug: createSlug(sequence.clientKeyPrefix, localId),
    }));
  }

  async getClient(localId: number, session: OrganizationSession) {
    return this.clientRepository.getClientByLocalId(
      this.db,
      localId,
      session.organizationId,
    );
  }

  async getClientsSelect(
    input: GetClientSelectInput,
    session: OrganizationSession,
  ) {
    return this.clientRepository.getClientsSelect(
      this.db,
      input,
      session.organizationId,
    );
  }

  async updateClient(
    input: UpdateInput<ClientInput>,
    localId: number,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      const client = await this.clientRepository.updateClient(
        tx,
        values,
        localId,
        session.organizationId,
      );
      assertDatabaseResult(client);
      const sequence =
        await this.organizationSequenceRepository.getSequenceByOrganizationId(
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
}
