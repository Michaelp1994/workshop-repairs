import type { CountInput, GetAllInput, GetAllSimpleInput } from "./types";

import { type Database } from "../db";
import { createSlug } from "../helpers/createSlug";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import AssetRepository from "../repositories/asset.repository";
import ClientRepository from "../repositories/client.repository";
import OrganizationSequenceRepository from "../repositories/organizationSequence.repository";
import RepairRepository, {
  RepairFilters,
} from "../repositories/repair.repository";

export default class RepairService {
  constructor(
    private db: Database,
    private repairRepository: RepairRepository,
    private organizationSequenceRepository: OrganizationSequenceRepository,
    private clientRepository: ClientRepository,
    private assetRepository: AssetRepository,
  ) {}

  async archiveRepair(localId: number, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      const { id, ...archivedRepair } = await this.repairRepository.archive(
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

      const slug = createSlug(sequence.repairKeyPrefix, localId);

      return { id: slug, ...archivedRepair };
    });
  }

  async countRepairs(
    input: CountInput<RepairFilters>,
    session: OrganizationSession,
  ) {
    return this.repairRepository.count(this.db, input, session.organizationId);
  }

  async createRepair(
    input: {
      fault: string;
      clientReference: string;
      typeId: number | string;
      statusId: number | string;
      clientLocalId: number;
      assetLocalId: number;
    },
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const sequence =
        await this.organizationSequenceRepository.incrementRepairSequence(
          tx,
          session.organizationId,
        );
      const metadata = createInsertMetadata(session);

      const client = await this.clientRepository.getByLocalId(
        tx,
        input.clientLocalId,
        session.organizationId,
      );
      const asset = await this.assetRepository.getByLocalId(tx, {
        localId: input.assetLocalId,
        organizationId: session.organizationId,
      });

      const values = {
        fault: input.fault,
        clientReference: input.clientReference,
        typeId: Number(input.typeId),
        statusId: Number(input.statusId),
        clientId: client.id,
        assetId: asset.id,
        ...metadata,
        localId: sequence.repairLastUsedValue,
      };
      const { id, ...repair } = await this.repairRepository.create(tx, values);

      const slug = createSlug(sequence.repairKeyPrefix, repair.localId);

      return {
        id: slug,
        ...repair,
      };
    });
  }

  async getAllRepairs(
    input: GetAllInput<RepairFilters>,
    session: OrganizationSession,
  ) {
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );

    const allRepairs = await this.repairRepository.getAll(
      this.db,
      input,
      session.organizationId,
    );
    return allRepairs.map(({ localId, ...repair }) => ({
      ...repair,
      id: createSlug(sequence.repairKeyPrefix, localId),
    }));
  }

  async getRepair(localId: number, session: OrganizationSession) {
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );
    const repair = await this.repairRepository.getByLocalId(
      this.db,
      localId,
      session.organizationId,
    );

    return {
      ...repair,
      id: createSlug(sequence.repairKeyPrefix, localId),
      modelId: createSlug(sequence.modelKeyPrefix, localId),
      locationId: createSlug(sequence.locationKeyPrefix, localId),
      clientId: createSlug(sequence.clientKeyPrefix, localId),
      assetId: createSlug(sequence.assetKeyPrefix, localId),
    };
  }

  async getRepairsSelect(
    input: GetAllSimpleInput<RepairFilters>,
    session: OrganizationSession,
  ) {
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );
    const repairs = await this.repairRepository.getAllSimple(
      this.db,
      input,
      session.organizationId,
    );
    return repairs.map(({ value, label }) => ({
      value: createSlug(sequence.repairKeyPrefix, value),
      label,
    }));
  }

  async updateRepair(
    input: {
      fault?: string;
      clientReference?: string;
      typeId?: number | string;
      statusId?: number | string;
      clientLocalId?: number;
      assetLocalId?: number;
    },
    localId: number,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);

      let clientId: number | undefined;
      let assetId: number | undefined;

      if (input.clientLocalId !== undefined) {
        const client = await this.clientRepository.getByLocalId(
          tx,
          input.clientLocalId,
          session.organizationId,
        );
        clientId = client.id;
      }
      if (input.assetLocalId !== undefined) {
        const asset = await this.assetRepository.getByLocalId(tx, {
          localId: input.assetLocalId,
          organizationId: session.organizationId,
        });
        assetId = asset.id;
      }

      const partialValues = {
        ...(input.fault !== undefined && { fault: input.fault }),
        ...(input.clientReference !== undefined && {
          clientReference: input.clientReference,
        }),
        ...(input.typeId !== undefined && { typeId: Number(input.typeId) }),
        ...(input.statusId !== undefined && {
          statusId: Number(input.statusId),
        }),
        ...(clientId !== undefined && { clientId }),
        ...(assetId !== undefined && { assetId }),
      };

      const values = {
        ...partialValues,
        ...metadata,
      };

      const { id, ...repair } = await this.repairRepository.update(
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

      const slug = createSlug(sequence.repairKeyPrefix, localId);

      return {
        id: slug,
        ...repair,
      };
    });
  }
}
