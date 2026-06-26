import type { ManufacturerInput } from "../tables/manufacturer.table";
import type {
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "../types";

import { type Database } from "../db";
import { createSlug } from "../helpers/createSlug";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import ManufacturerRepository from "../repositories/manufacturer.repository";
import OrganizationSequenceRepository from "../repositories/organizationSequence.repository";

export default class ManufacturerService {
  constructor(
    private db: Database,
    private manufacturerRepository: ManufacturerRepository,
    private organizationSequenceRepository: OrganizationSequenceRepository,
  ) {}

  async archiveManufacturer(localId: number, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      const { id, ...manufacturer } = await this.manufacturerRepository.archive(
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

      const slug = createSlug(sequence.manufacturerKeyPrefix, localId);
      return {
        id: slug,
        ...manufacturer,
      };
    });
  }

  async countManufacturers(input: CountInput, session: OrganizationSession) {
    return this.manufacturerRepository.count(
      this.db,
      input,
      session.organizationId,
    );
  }

  async createManufacturer(
    input: CreateInput<ManufacturerInput>,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const sequence =
        await this.organizationSequenceRepository.incrementManufacturerSequence(
          tx,
          session.organizationId,
        );

      const metadata = createInsertMetadata(session);
      const values = {
        localId: sequence.manufacturerLastUsedValue,
        ...metadata,
        ...input,
      };
      const { id, ...manufacturer } = await this.manufacturerRepository.create(
        tx,
        values,
      );

      const slug = createSlug(
        sequence.manufacturerKeyPrefix,
        manufacturer.localId,
      );
      return {
        id: slug,
        ...manufacturer,
      };
    });
  }

  async getAllManufacturers(input: GetAllInput, session: OrganizationSession) {
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );

    const allManufacturers = await this.manufacturerRepository.getAll(
      this.db,
      input,
      session.organizationId,
    );
    return allManufacturers.map(({ localId, ...manufacturer }) => ({
      ...manufacturer,
      id: createSlug(sequence.manufacturerKeyPrefix, localId),
    }));
  }

  async getManufacturer(localId: number, session: OrganizationSession) {
    return this.manufacturerRepository.getByLocalId(
      this.db,
      localId,
      session.organizationId,
    );
  }

  async getManufacturersSelect(
    input: GetAllSimpleInput,
    session: OrganizationSession,
  ) {
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );
    const manufacturers = await this.manufacturerRepository.getAllSimple(
      this.db,
      input,
      session.organizationId,
    );
    return manufacturers.map(({ value, label }) => ({
      value: createSlug(sequence.manufacturerKeyPrefix, value),
      label,
    }));
  }

  async updateManufacturer(
    input: UpdateInput<ManufacturerInput>,
    localId: number,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = {
        ...metadata,
        ...input,
      };
      const { id, ...manufacturer } = await this.manufacturerRepository.update(
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

      const slug = createSlug(sequence.manufacturerKeyPrefix, localId);
      return {
        id: slug,
        ...manufacturer,
      };
    });
  }
}
