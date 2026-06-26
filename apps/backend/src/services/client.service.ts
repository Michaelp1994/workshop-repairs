import type { ClientInput } from "../tables/client.table";
import type {
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "./types";

import { type Database } from "../db";
import { createSlug } from "../helpers/createSlug";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import ClientRepository from "../repositories/client.repository";
import OrganizationSequenceRepository from "../repositories/organizationSequence.repository";

export default class ClientService {
  constructor(
    private db: Database,
    private clientRepository: ClientRepository,
    private organizationSequenceRepository: OrganizationSequenceRepository,
  ) {}

  async archiveClient(localId: number, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      const { id, ...archivedClient } = await this.clientRepository.archive(
        tx,
        metadata,
        localId,
        session.organizationId,
      );

      const sequence =
        await this.organizationSequenceRepository.getByOrganizationId(
          tx,
          session.organizationId,
        );

      const slug = createSlug(sequence.clientKeyPrefix, localId);
      return { id: slug, ...archivedClient };
    });
  }

  async countClients(input: CountInput, session: OrganizationSession) {
    return this.clientRepository.count(this.db, input, session.organizationId);
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

      const values = {
        ...input,
        ...metadata,
        localId: sequence.clientLastUsedValue,
      };
      const { id, ...client } = await this.clientRepository.create(tx, values);

      const slug = createSlug(sequence.clientKeyPrefix, client.localId);

      return {
        id: slug,
        ...client,
      };
    });
  }

  async getAllClients(input: GetAllInput, session: OrganizationSession) {
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );

    const allClients = await this.clientRepository.getAll(
      this.db,
      input,
      session.organizationId,
    );

    return allClients.map(({ localId, ...client }) => ({
      ...client,
      id: createSlug(sequence.clientKeyPrefix, localId),
    }));
  }

  async getClient(localId: number, session: OrganizationSession) {
    return this.clientRepository.getByLocalId(
      this.db,
      localId,
      session.organizationId,
    );
  }

  async getClientsSelect(
    input: GetAllSimpleInput,
    session: OrganizationSession,
  ) {
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );
    const clients = await this.clientRepository.getAllSimple(
      this.db,
      input,
      session.organizationId,
    );
    return clients.map(({ value, label }) => ({
      value: createSlug(sequence.clientKeyPrefix, value),
      label,
    }));
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
      const { id, ...client } = await this.clientRepository.update(
        tx,
        values,
        localId,
        session.organizationId,
      );

      const sequence =
        await this.organizationSequenceRepository.getByOrganizationId(
          tx,
          session.organizationId,
        );

      const slug = createSlug(sequence.clientKeyPrefix, localId);
      return {
        id: slug,
        ...client,
      };
    });
  }
}
