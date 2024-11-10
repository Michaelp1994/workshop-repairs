import type { Session } from "@repo/validators/auth.validators";

import { generateToken } from "@repo/auth/tokens";

export default async function createSession(user: User) {
  const token = await generateToken({
    userId: user.id,
    organizationId: user.organizationId,
  });
  const session: Session = {
    token,
    onboardingCompleted: user.onboardingCompleted,
    emailVerified: user.emailVerified,
  };
  return session;
}
