import type { RepairPartID } from "@repo/validators/ids.validators";
import type {
  CountRepairPartsInput,
  GetAllRepairPartsInput,
} from "@repo/validators/server/repairParts.validators";

import { type Database } from "@repo/db";
import RepairPartRepository from "@repo/db/repositories/repairPart.repository";

import type { RepairPartInput } from "../../../db/src/tables/repair-part.table";
import type { CreateInput, UpdateInput } from "../types";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";

export default class RepairPartService {
  constructor(
    private db: Database,
    private repairPartRepository: RepairPartRepository,
  ) {}
  async archiveRepairPart(id: RepairPartID, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      return this.repairPartRepository.archiveRepairPart(tx, metadata, id);
    });
  }

  async countRepairParts(
    input: CountRepairPartsInput,
    _session: OrganizationSession,
  ) {
    return this.repairPartRepository.countRepairParts(this.db, input);
  }

  async createRepairPart(
    input: CreateInput<RepairPartInput>,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createInsertMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      return this.repairPartRepository.createRepairPart(tx, values);
    });
  }

  async getAllRepairParts(
    input: GetAllRepairPartsInput,
    _session: OrganizationSession,
  ) {
    return this.repairPartRepository.getAllRepairParts(this.db, input);
  }

  async getRepairPartById(id: RepairPartID, _session: OrganizationSession) {
    return this.repairPartRepository.getRepairPartById(this.db, id);
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
      return this.repairPartRepository.updateRepairPart(tx, values, id);
    });
  }
}
