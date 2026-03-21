import type { RepairStatusTypeID } from "@repo/validators/ids.validators";

import { type Database } from "@repo/db";
import RepairStatusTypeRepository from "@repo/db/repositories/repairStatusType.repository";

import type { RepairStatusTypeInput } from "../../../db/src/tables/repairStatusType.table";
import type {
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "../types";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";

export default class RepairStatusTypeService {
  constructor(
    private db: Database,
    private repairStatusTypeRepository: RepairStatusTypeRepository,
  ) {}
  async archiveRepairStatusType(
    repairStatusId: RepairStatusTypeID,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      return this.repairStatusTypeRepository.archive(
        tx,
        metadata,
        repairStatusId,
      );
    });
  }

  async countRepairStatusTypes(
    input: CountInput,
    _session: OrganizationSession,
  ) {
    return this.repairStatusTypeRepository.count(this.db, input);
  }

  async createRepairStatusType(
    input: CreateInput<RepairStatusTypeInput>,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createInsertMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      return this.repairStatusTypeRepository.create(tx, values);
    });
  }

  async getAllRepairStatusTypes(
    input: GetAllInput,
    _session: OrganizationSession,
  ) {
    return this.repairStatusTypeRepository.getAll(this.db, input);
  }

  async getRepairStatusById(
    id: RepairStatusTypeID,
    _session: OrganizationSession,
  ) {
    return this.repairStatusTypeRepository.getById(this.db, id);
  }

  async getRepairStatusSelect(
    input: GetAllSimpleInput,
    _session: OrganizationSession,
  ) {
    return this.repairStatusTypeRepository.getAllSimple(this.db, input);
  }

  async updateRepairStatusType(
    input: UpdateInput<RepairStatusTypeInput>,
    repairStatusId: RepairStatusTypeID,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      return this.repairStatusTypeRepository.update(tx, values, repairStatusId);
    });
  }
}
