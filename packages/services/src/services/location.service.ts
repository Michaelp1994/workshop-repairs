import type {
  CountLocationsInput,
  GetAllLocationsInput,
  GetLocationsSelectInput,
} from "@repo/validators/server/locations.validators";

import { db } from "@repo/db";
import {
  archiveLocation,
  countLocations,
  createLocation,
  getAllLocations,
  getLocationByLocalId,
  getLocationsSelect,
  updateLocation,
} from "@repo/db/repositories/location.repository";
import {
  getSequenceByOrganizationId,
  incrementLocationSequence,
} from "@repo/db/repositories/organizationSequence.repository";

import type { LocationInput } from "../../../db/src/tables/location.sql";
import type { CreateInput, UpdateInput } from "../types";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import { createSlug } from "../helpers/slugs";

export async function getAllLocationsService(
  input: GetAllLocationsInput,
  session: OrganizationSession,
) {
  const sequence = await getSequenceByOrganizationId(
    db,
    session.organizationId,
  );
  assertDatabaseResult(sequence);
  const allLocations = await getAllLocations(db, input, session.organizationId);
  return allLocations.map(({ localId, ...location }) => ({
    ...location,
    slug: createSlug(sequence.locationKeyPrefix, localId),
  }));
}

export async function countLocationsService(
  input: CountLocationsInput,
  session: OrganizationSession,
) {
  const count = await countLocations(db, input, session.organizationId);
  assertDatabaseResult(count);
  return count;
}

export async function getLocationsSelectService(
  input: GetLocationsSelectInput,
  session: OrganizationSession,
) {
  const locations = await getLocationsSelect(db, input, session.organizationId);
  return locations;
}

export async function getLocationService(
  localId: number,
  session: OrganizationSession,
) {
  const location = await getLocationByLocalId(
    db,
    localId,
    session.organizationId,
  );
  assertDatabaseResult(location);
  return location;
}

export async function createLocationService(
  input: CreateInput<LocationInput>,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const sequence = await incrementLocationSequence(
      tx,
      session.organizationId,
    );
    const metadata = createInsertMetadata(session);
    assertDatabaseResult(sequence);
    const values = {
      ...input,
      ...metadata,
      localId: sequence.locationLastUsedValue,
    };
    const location = await createLocation(tx, values);
    assertDatabaseResult(location);
    const slug = createSlug(sequence.locationKeyPrefix, location.localId);
    return {
      ...location,
      slug,
    };
  });
}

export async function updateLocationService(
  input: UpdateInput<LocationInput>,
  localId: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createUpdateMetadata(session);
    const values = {
      ...input,
      ...metadata,
    };

    const updatedLocation = await updateLocation(
      tx,
      values,
      localId,
      session.organizationId,
    );
    assertDatabaseResult(updatedLocation);
    const sequence = await getSequenceByOrganizationId(
      tx,
      session.organizationId,
    );
    assertDatabaseResult(sequence);
    const slug = createSlug(sequence.locationKeyPrefix, localId);
    return {
      slug,
      ...updatedLocation,
    };
  });
}

export async function archiveLocationService(
  localId: number,
  session: OrganizationSession,
) {
  return await db.transaction(async (tx) => {
    const metadata = createArchiveMetadata(session);
    const archivedLocation = await archiveLocation(
      tx,
      metadata,
      localId,
      session.organizationId,
    );
    assertDatabaseResult(archivedLocation);
    const sequence = await getSequenceByOrganizationId(
      tx,
      session.organizationId,
    );
    assertDatabaseResult(sequence);
    const slug = createSlug(sequence.locationKeyPrefix, localId);
    return { slug, ...archivedLocation };
  });
}
