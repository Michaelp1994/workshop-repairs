import type { RepairStatusTypeID } from "@repo/validators/ids.validators";
import type {
  CountRepairStatusTypesInput,
  GetAllRepairStatusTypesInput,
  GetRepairStatusSelectInput,
} from "@repo/validators/server/repairStatusTypes.validators";

import { type Database, db } from "@repo/db";
import RepairStatusTypeRepository from "@repo/db/repositories/repairStatusType.repository";

import type { RepairStatusTypeInput } from "../../../db/src/tables/repair-status-type.sql";
import type { CreateInput, UpdateInput } from "../types";

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
      return this.repairStatusTypeRepository.archiveRepairStatus(
        tx,
        metadata,
        repairStatusId,
      );
    });
  }

  async countRepairStatusTypes(
    input: CountRepairStatusTypesInput,
    _session: OrganizationSession,
  ) {
    return this.repairStatusTypeRepository.countRepairStatusTypes(db, input);
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
      return this.repairStatusTypeRepository.createRepairStatus(tx, values);
    });
  }

  async getAllRepairStatusTypes(
    input: GetAllRepairStatusTypesInput,
    _session: OrganizationSession,
  ) {
    return this.repairStatusTypeRepository.getAllRepairStatusTypes(db, input);
  }

  async getRepairStatusById(
    id: RepairStatusTypeID,
    _session: OrganizationSession,
  ) {
    return this.repairStatusTypeRepository.getRepairStatusById(db, id);
  }

  async getRepairStatusSelect(
    input: GetRepairStatusSelectInput,
    _session: OrganizationSession,
  ) {
    return this.repairStatusTypeRepository.getRepairStatusTypesSelect(
      db,
      input,
    );
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
      return this.repairStatusTypeRepository.updateRepairStatus(
        tx,
        values,
        repairStatusId,
      );
    });
  }
}
