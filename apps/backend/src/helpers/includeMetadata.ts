import type { Session } from "@repo/auth/sessions";

export function createArchiveMetadata(session: Session) {
  return {
    deletedAt: new Date(),
    deletedById: session.userId,
  };
}

export function createInsertMetadata(session: Session) {
  return {
    createdAt: new Date(),
    createdById: session.userId,
  };
}

export function createUpdateMetadata(session: Session) {
  return {
    updatedAt: new Date(),
    updatedById: session.userId,
  };
}
