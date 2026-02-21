import type { RepairPartID } from "@repo/validators/ids.validators";
import type {
  CountRepairPartsInput,
  GetAllRepairPartsInput,
} from "@repo/validators/server/repairParts.validators";

import { type Database } from "@repo/db";
import RepairPartRepository from "@repo/db/repositories/repairPart.repository";

import type { RepairPartInput } from "../../../db/src/tables/repairPart.table";
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
      return this.repairPartRepository.archive(tx, metadata, id);
    });
  }

  async countRepairParts(
    input: CountRepairPartsInput,
    _session: OrganizationSession,
  ) {
    return this.repairPartRepository.count(this.db, input);
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
      return this.repairPartRepository.create(tx, values);
    });
  }

  async getAllRepairParts(
    input: GetAllRepairPartsInput,
    _session: OrganizationSession,
  ) {
    return this.repairPartRepository.getAll(this.db, input);
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
