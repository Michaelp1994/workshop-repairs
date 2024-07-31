import { type Session } from "@repo/auth";

export function createMetadata(session: Session) {
  if (!session.user?.id) {
    throw new Error("Session data not found");
  }
  return {
    createdAt: new Date(),
    createdById: Number(session.user.id),
  };
}

export function updateMetadata(session: Session) {
  if (!session.user?.id) {
    throw new Error("Session data not found");
  }
  return {
    updatedAt: new Date(),
    updatedById: Number(session.user.id),
  };
}

export function deleteMetadata(session: Session) {
  if (!session.user?.id) {
    throw new Error("Session data not found");
  }
  return {
    deletedAt: new Date(),
    deletedById: Number(session.user.id),
  };
}
