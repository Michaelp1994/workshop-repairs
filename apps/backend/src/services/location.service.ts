import type { LocationInput } from "../tables/location.table";
import type {
  CountInput,
  CreateInput,
  GetAllInput,
  GetAllSimpleInput,
  UpdateInput,
} from "../types";

import { type Database } from "../db";
import { createSlug } from "../helpers/createSlug";
import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import LocationRepository from "../repositories/location.repository";
import OrganizationSequenceRepository from "../repositories/organizationSequence.repository";

export default class LocationService {
  constructor(
    private db: Database,
    private locationRepository: LocationRepository,
    private organizationSequenceRepository: OrganizationSequenceRepository,
  ) {}

  async archiveLocation(localId: number, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      const { id, ...archivedLocation } = await this.locationRepository.archive(
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
      return { id: slug, ...archivedLocation };
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
      const { id, ...location } = await this.locationRepository.create(
        tx,
        values,
      );

      const slug = createSlug(sequence.locationKeyPrefix, location.localId);
      return {
        id: slug,
        ...location,
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
      id: createSlug(sequence.locationKeyPrefix, localId),
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
    const sequence =
      await this.organizationSequenceRepository.getByOrganizationId(
        this.db,
        session.organizationId,
      );
    const locations = await this.locationRepository.getAllSimple(
      this.db,
      input,
      session.organizationId,
    );
    return locations.map(({ value, label }) => ({
      value: createSlug(sequence.locationKeyPrefix, value),
      label,
    }));
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

      const { id, ...updatedLocation } = await this.locationRepository.update(
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
        id: slug,
        ...updatedLocation,
      };
    });
  }
}
