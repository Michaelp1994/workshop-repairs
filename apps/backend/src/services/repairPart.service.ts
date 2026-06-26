import type { RepairPartInput } from "../tables/repairPart.table";
import type { CountInput, GetAllInput, UpdateInput } from "./types";
import type { RepairPartID } from "../validators/ids.validators";

import { type Database } from "../db";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import PartRepository from "../repositories/part.repository";
import RepairRepository from "../repositories/repair.repository";
import RepairPartRepository from "../repositories/repairPart.repository";

export default class RepairPartService {
  constructor(
    private db: Database,
    private repairPartRepository: RepairPartRepository,
    private repairRepository: RepairRepository,
    private partRepository: PartRepository,
  ) {}
  async archiveRepairPart(id: RepairPartID, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      return this.repairPartRepository.archive(tx, metadata, id);
    });
  }

  async countRepairParts(
    input: CountInput<{ repairLocalId?: number }>,
    session: OrganizationSession,
  ) {
    let repairId: number | undefined;
    if (input.filters.repairLocalId !== undefined) {
      const repair = await this.repairRepository.getByLocalId(
        this.db,
        input.filters.repairLocalId,
        session.organizationId,
      );
      repairId = repair.id;
    }
    return this.repairPartRepository.count(this.db, {
      ...input,
      filters: { repairId },
    });
  }

  async createRepairPart(
    input: {
      quantity: number;
      installed: boolean;
      repairLocalId: number;
      partLocalId: number;
    },
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const repair = await this.repairRepository.getByLocalId(
        tx,
        input.repairLocalId,
        session.organizationId,
      );
      const part = await this.partRepository.getByLocalId(
        tx,
        input.partLocalId,
        session.organizationId,
      );
      const metadata = createInsertMetadata(session);
      const values = {
        ...input,
        ...metadata,
        repairId: repair.id,
        partId: part.id,
      };
      return this.repairPartRepository.create(tx, values);
    });
  }

  async getAllRepairParts(
    input: GetAllInput<{ repairLocalId?: number }>,
    session: OrganizationSession,
  ) {
    let repairId: number | undefined;
    if (input.filters.repairLocalId !== undefined) {
      const repair = await this.repairRepository.getByLocalId(
        this.db,
        input.filters.repairLocalId,
        session.organizationId,
      );
      repairId = repair.id;
    }
    return this.repairPartRepository.getAll(this.db, {
      ...input,
      filters: { repairId },
    });
  }

  async getRepairPartById(id: RepairPartID, _session: OrganizationSession) {
    return this.repairPartRepository.getById(this.db, id);
  }

  async updateRepairPart(
    input: UpdateInput<RepairPartInput>,
    id: RepairPartID,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      return this.repairPartRepository.update(tx, values, id);
    });
  }
}
