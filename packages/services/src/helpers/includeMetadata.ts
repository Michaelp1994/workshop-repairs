export interface AuthedSession {
  userId: number;
}

export interface OrganizationSession {
  userId: number;
  organizationId: number;
}

export function createInsertMetadata(session: OrganizationSession) {
  return {
    createdAt: new Date(),
    createdById: session.userId,
    organizationId: session.organizationId,
  };
}

export function createUpdateMetadata(
  session: OrganizationSession | AuthedSession,
) {
  return {
    updatedAt: new Date(),
    updatedById: session.userId,
  };
}

export function createArchiveMetadata(session: OrganizationSession) {
  return {
    deletedAt: new Date(),
    deletedById: session.userId,
  };
}
