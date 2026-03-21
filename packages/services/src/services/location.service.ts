import { type Database } from "@repo/db";
import LocationRepository from "@repo/db/repositories/location.repository";
import OrganizationSequenceRepository from "@repo/db/repositories/organizationSequence.repository";

import type { LocationInput } from "../../../db/src/tables/location.table";
import type {
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "../types";

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

      const sequence =
        await this.organizationSequenceRepository.getByOrganizationId(
          tx,
          session.organizationId,
        );

      const slug = createSlug(sequence.locationKeyPrefix, localId);
      return { slug, ...archivedLocation };
    });
  }

  async countLocations(input: CountInput, session: OrganizationSession) {
    const count = await this.locationRepository.count(
      this.db,
      input,
      session.organizationId,
    );

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

      const values = {
        ...input,
        ...metadata,
        localId: sequence.locationLastUsedValue,
      };
      const location = await this.locationRepository.create(tx, values);

      const slug = createSlug(sequence.locationKeyPrefix, location.localId);
      return {
        ...location,
        slug,
      };
    });
  }

  async getAllLocations(input: GetAllInput, session: OrganizationSession) {
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );

    const allLocations = await this.locationRepository.getAll(
      this.db,
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
      this.db,
      localId,
      session.organizationId,
    );

    return location;
  }

  async getLocationsSelect(
    input: GetAllSimpleInput,
    session: OrganizationSession,
  ) {
    const locations = await this.locationRepository.getAllSimple(
      this.db,
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

      const sequence =
        await this.organizationSequenceRepository.getByOrganizationId(
          tx,
          session.organizationId,
        );

      const slug = createSlug(sequence.locationKeyPrefix, localId);
      return {
        slug,
        ...updatedLocation,
      };
    });
  }
}
