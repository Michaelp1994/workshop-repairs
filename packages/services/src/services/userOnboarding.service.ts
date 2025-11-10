import type { UserID } from "@repo/validators/ids.validators";

import { db } from "@repo/db";
import { getOrganizationByInvitationCode } from "@repo/db/repositories/organization.repository";
import {
  getUserOnboardingByUserId,
  setInvitations,
  updateUserOnboardingByUserId,
} from "@repo/db/repositories/userOnboarding.repository";

export async function getStatusService(userId: UserID) {
  return getUserOnboardingByUserId(db, userId);
}

export async function markUserAsWelcomedService(userId: UserID) {
  return await db.transaction(async (tx) => {
    const values: Partial<UserOnboardingInput> & { userId: UserID } = {
      userId: userId,
      welcomed: true,
    };
    return updateUserOnboardingByUserId(tx, values);
  });
}

export async function requestUploadService(input: unknown) {
  // handled at router level (presigned url), passthrough available
  return input;
}

export async function joinOrganizationService(joinCode: string) {
  return getOrganizationByInvitationCode(db, joinCode);
}

export async function sendInvitationsService(userId: UserID) {
  return await db.transaction(async (tx) => setInvitations(tx, userId));
}

export async function skipInvitationsService(userId: UserID) {
  // Logic is the same as sendInvitationsService, just marking the step complete.
  return await db.transaction(async (tx) => setInvitations(tx, userId));
}
