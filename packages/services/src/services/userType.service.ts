import type { UserTypeID } from "@repo/validators/ids.validators";
import type {
  CountUserTypesInput,
  GetAllUserTypesInput,
  GetUserTypeSelectInput,
} from "@repo/validators/server/userTypes.validators";

import { type Database } from "@repo/db";
import UserTypeRepository from "@repo/db/repositories/userType.repository";

import type { UserTypeInput } from "../../../db/src/tables/user-type.sql";
import type { CreateInput, UpdateInput } from "../types";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";

export default class UserTypeService {
  constructor(
    private db: Database,
    private userTypeRepository: UserTypeRepository,
  ) {}

  async archiveUserType(id: UserTypeID, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      return this.userTypeRepository.archiveUserType(tx, metadata, id);
    });
  }

  async countUserTypes(
    input: CountUserTypesInput,
    _session: OrganizationSession,
  ) {
    return this.userTypeRepository.countUserTypes(this.db, input);
  }

  async createUserType(
    input: CreateInput<UserTypeInput>,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createInsertMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      return this.userTypeRepository.createUserType(tx, values);
    });
  }

  async getAllUserTypes(
    input: GetAllUserTypesInput,
    _session: OrganizationSession,
  ) {
    return this.userTypeRepository.getAllUserTypes(this.db, input);
  }

  async getUserTypeById(id: UserTypeID, _session: OrganizationSession) {
    return this.userTypeRepository.getUserTypeById(this.db, id);
  }

  async getUserTypesSelect(
    input: GetUserTypeSelectInput,
    _session: OrganizationSession,
  ) {
    return this.userTypeRepository.getUserTypesSelect(this.db, input);
  }

  async updateUserType(
    input: UpdateInput<UserTypeInput>,
    id: UserTypeID,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      return this.userTypeRepository.updateUserType(tx, values, id);
    });
  }
}
