import type { OrganizationID, UserID } from "@repo/validators/ids.validators";
import type { Session } from "@repo/validators/server/auth.validators";

import { generateToken } from "@repo/auth/tokens";

interface CreateSessionInput {
  id: UserID;
  organizationId: OrganizationID | null;
  onboardingCompleted: boolean;
  emailVerified: boolean;
}

export default async function createSession({
  id,
  organizationId,
  onboardingCompleted,
  emailVerified,
}: CreateSessionInput) {
  const token = await generateToken({
    userId: id,
    organizationId: organizationId,
  });
  const session: Session = {
    token,
    onboardingCompleted: onboardingCompleted,
    emailVerified: emailVerified,
  };
  return session;
}
