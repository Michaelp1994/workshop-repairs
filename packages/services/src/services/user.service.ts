import type { UserID } from "@repo/validators/ids.validators";
import type {
  CountUsersInput,
  GetAllUsersInput,
} from "@repo/validators/server/users.validators";

import { db } from "@repo/db";
import {
  deleteEmailConfirmationRequestById,
  getEmailVerificationRequest,
} from "@repo/db/repositories/emailVerificationRequest.repository";
import {
  getCredentialsByUserId,
  getUserByEmail,
} from "@repo/db/repositories/user.repository";
import {
  archiveUser,
  countUsers,
  createUser,
  getAllUsers,
  getUserById,
  setUserEmailVerified,
  updateUser,
} from "@repo/db/repositories/user.repository";

import type { UserInput } from "../../../db/src/tables/user.sql";
import type { CreateInput, UpdateInput } from "../types";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
import {
  type AuthedSession,
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import sendVerificationEmail from "../helpers/sendVerificationEmail";

export async function getAllUsersService(
  input: GetAllUsersInput,
  session: OrganizationSession,
) {
  return getAllUsers(db, input, session.organizationId);
}

export async function countUsersService(
  input: CountUsersInput,
  session: OrganizationSession,
) {
  return countUsers(db, input, session.organizationId);
}

// export async function resetPasswordService(input: unknown) {
//   return input;
// }

export async function sendEmailConfirmationService(
  input: { email: string },
  session: AuthedSession,
) {
  await sendVerificationEmail(session.userId, input.email);
  return true;
}

export async function confirmEmailService(input: {
  email: string;
  code: string;
}) {
  const user = await getUserByEmail(db, input.email);
  assertDatabaseResult(user);
  const request = await getEmailVerificationRequest(
    db,
    input.email,
    input.code,
  );
  assertDatabaseResult(request);

  await db.transaction(async (tx) => {
    await setUserEmailVerified(tx, user.id);
    await deleteEmailConfirmationRequestById(db, request.id);
  });

  return true;
}

export async function getUserByIdService(id: UserID) {
  return getUserById(db, id);
}

export async function getCredentialsByUserIdService(id: UserID) {
  return await getCredentialsByUserId(db, id);
}

export async function createUserService(
  input: CreateInput<UserInput>,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createInsertMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return createUser(tx, values);
  });
}

export async function updateUserService(
  input: UpdateInput<UserInput>,
  id: UserID,
  session: AuthedSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createUpdateMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };
    return updateUser(tx, values, id);
  });
}

export async function archiveUserService(
  id: UserID,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createArchiveMetadata(session);
    return archiveUser(tx, metadata, id);
  });
}
