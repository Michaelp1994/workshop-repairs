import type { UserID } from "@repo/validators/ids.validators";

import type { Session } from "../trpc";

export function createMetadata(session: Session) {
  return {
    createdAt: new Date(),
    createdById: session.userId,
  };
}

export function updateMetadata(session: Session) {
  return {
    updatedAt: new Date(),
    updatedById: session.userId,
  };
}

export function archiveMetadata(session: Session) {
  return {
    deletedAt: new Date(),
    deletedById: session.userId,
  };
}
