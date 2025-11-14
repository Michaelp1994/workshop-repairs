import type {
  DataTableCountOutput,
  DataTableOutput,
  GetSelectInput,
} from "@repo/validators/server/dataTables.validators";

import { type Database, db } from "@repo/db";
import ManufacturerRepository from "@repo/db/repositories/manufacturer.repository";
import OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";

import type { ManufacturerInput } from "../../../db/src/tables/manufacturer.table";
import type { CreateInput, UpdateInput } from "../types";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import { createSlug } from "../helpers/slugs";

export default class ManufacturerService {
  constructor(
    private db: Database,
    private manufacturerRepository: ManufacturerRepository,
    private organizationSequenceRepository: OrganizationSequenceRepository,
  ) {}

  async archiveManufacturer(localId: number, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      const manufacturer =
        await this.manufacturerRepository.archiveManufacturer(
          tx,
          metadata,
          localId,
          session.organizationId,
        );
      assertDatabaseResult(manufacturer);
      const sequence =
        await this.organizationSequenceRepository.getSequenceByOrganizationId(
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

  async countManufacturers(
    input: DataTableCountOutput,
    session: OrganizationSession,
  ) {
    return this.manufacturerRepository.countManufacturers(
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
      assertDatabaseResult(sequence);
      const metadata = createInsertMetadata(session);
      const values = {
        localId: sequence.manufacturerLastUsedValue,
        ...metadata,
        ...input,
      };
      const manufacturer = await this.manufacturerRepository.createManufacturer(
        tx,
        values,
      );
      assertDatabaseResult(manufacturer);
      const slug = createSlug(
        sequence.manufacturerKeyPrefix,
        manufacturer.localId,
      );
      return {
        ...manufacturer,
        slug,
      };
    });
  }

  async getAllManufacturers(
    input: DataTableOutput,
    session: OrganizationSession,
  ) {
    const sequence =
      await this.organizationSequenceRepository.getSequenceByOrganizationId(
        db,
        session.organizationId,
      );

    assertDatabaseResult(sequence);
    const allManufacturers =
      await this.manufacturerRepository.getAllManufacturers(
        db,
        input,
        session.organizationId,
      );
    return allManufacturers.map(({ localId, ...manufacturer }) => ({
      ...manufacturer,
      slug: createSlug(sequence.manufacturerKeyPrefix, localId),
    }));
  }

  async getManufacturer(localId: number, session: OrganizationSession) {
    return this.manufacturerRepository.getManufacturerByLocalId(
      this.db,
      localId,
      session.organizationId,
    );
  }

  async getManufacturersSelect(
    input: GetSelectInput,
    session: OrganizationSession,
  ) {
    return this.manufacturerRepository.getManufacturersSelect(
      this.db,
      input,
      session.organizationId,
    );
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
      const manufacturer = await this.manufacturerRepository.updateManufacturer(
        tx,
        values,
        localId,
        session.organizationId,
      );
      assertDatabaseResult(manufacturer);
      const sequence =
        await this.organizationSequenceRepository.getSequenceByOrganizationId(
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
}
