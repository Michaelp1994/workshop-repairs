import type {
  CountLocationsInput,
  GetAllLocationsInput,
  GetLocationsSelectInput,
} from "@repo/validators/server/locations.validators";

import { type Database, db } from "@repo/db";
import LocationRepository from "@repo/db/repositories/location.repository";
import OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";

import type { LocationInput } from "../../../db/src/tables/location.table";
import type { CreateInput, UpdateInput } from "../types";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import { createSlug } from "../helpers/slugs";

export default class LocationService {
  constructor(
    private db: Database,
    private locationRepository: LocationRepository,
    private organizationSequenceRepository: OrganizationSequenceRepository,
  ) {}

  async archiveLocation(localId: number, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      const archivedLocation = await this.locationRepository.archive(
        tx,
        metadata,
        localId,
        session.organizationId,
      );
      assertDatabaseResult(archivedLocation);
      const sequence =
        await this.organizationSequenceRepository.getByOrganizationId(
          tx,
          session.organizationId,
        );
      assertDatabaseResult(sequence);
      const slug = createSlug(sequence.locationKeyPrefix, localId);
      return { slug, ...archivedLocation };
    });
  }

  async countLocations(
    input: CountLocationsInput,
    session: OrganizationSession,
  ) {
    const count = await this.locationRepository.count(
      db,
      input,
      session.organizationId,
    );
    assertDatabaseResult(count);
    return count;
  }

  async createLocation(
    input: CreateInput<LocationInput>,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const sequence =
        await this.organizationSequenceRepository.incrementLocationSequence(
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
      const location = await this.locationRepository.create(tx, values);
      assertDatabaseResult(location);
      const slug = createSlug(sequence.locationKeyPrefix, location.localId);
      return {
        ...location,
        slug,
      };
    });
  }

  async getAllLocations(
    input: GetAllLocationsInput,
    session: OrganizationSession,
  ) {
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        db,
        session.organizationId,
      );
    assertDatabaseResult(sequence);
    const allLocations = await this.locationRepository.getAll(
      db,
      input,
      session.organizationId,
    );
    return allLocations.map(({ localId, ...location }) => ({
      ...location,
      slug: createSlug(sequence.locationKeyPrefix, localId),
    }));
  }

  async getLocation(localId: number, session: OrganizationSession) {
    const location = await this.locationRepository.getByLocalId(
      db,
      localId,
      session.organizationId,
    );
    assertDatabaseResult(location);
    return location;
  }

  async getLocationsSelect(
    input: GetLocationsSelectInput,
    session: OrganizationSession,
  ) {
    const locations = await this.locationRepository.getAllSimple(
      db,
      input,
      session.organizationId,
    );
    return locations;
  }

  async updateLocation(
    input: UpdateInput<LocationInput>,
    localId: number,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };

      const updatedLocation = await this.locationRepository.update(
        tx,
        values,
        localId,
        session.organizationId,
      );
      assertDatabaseResult(updatedLocation);
      const sequence =
        await this.organizationSequenceRepository.getByOrganizationId(
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
}
