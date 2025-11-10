import type { UserTypeID } from "@repo/validators/ids.validators";
import type {
  CountUserTypesInput,
  GetAllUserTypesInput,
  GetUserTypeSelectInput,
} from "@repo/validators/server/userTypes.validators";

import { db } from "@repo/db";
import {
  archiveUserType,
  countUserTypes,
  createUserType,
  getAllUserTypes,
  getUserTypeById,
  getUserTypesSelect,
  updateUserType,
} from "@repo/db/repositories/userType.repository";

import type { UserTypeInput } from "../../../db/src/tables/user-type.sql";
import type { CreateInput, UpdateInput } from "../types";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";

export async function createUserTypeService(
  input: CreateInput<UserTypeInput>,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createInsertMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return createUserType(tx, values);
  });
}

export async function getAllUserTypesService(
  input: GetAllUserTypesInput,
  _session: OrganizationSession,
) {
  return getAllUserTypes(db, input);
}

export async function countUserTypesService(
  input: CountUserTypesInput,
  _session: OrganizationSession,
) {
  return countUserTypes(db, input);
}

export async function getUserTypeByIdService(
  id: UserTypeID,
  _session: OrganizationSession,
) {
  return getUserTypeById(db, id);
}

export async function getUserTypesSelectService(
  input: GetUserTypeSelectInput,
  _session: OrganizationSession,
) {
  return getUserTypesSelect(db, input);
}

export async function updateUserTypeService(
  input: UpdateInput<UserTypeInput>,
  id: UserTypeID,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createUpdateMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return updateUserType(tx, values, id);
  });
}

export async function archiveUserTypeService(
  id: UserTypeID,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createArchiveMetadata(session);
    return archiveUserType(tx, metadata, id);
  });
}
