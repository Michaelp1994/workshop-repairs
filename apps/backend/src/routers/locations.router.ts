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
  archiveLocationSchema,
  countLocationsSchema,
  createLocationSchema,
  getAllLocationsSchema,
  getLocationBySlugSchema,
  getLocationsSelectSchema,
  updateLocationSchema,
} from "@repo/validators/server/locations.validators";
import { TRPCError } from "@trpc/server";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import { splitSlug } from "../helpers/splitUrlSlug";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllLocationsSchema)
    .query(({ ctx, input }) => {
      const allLocations = getAllLocations(input, ctx.session.organizationId);

      return allLocations;
    }),
  countAll: organizationProcedure
    .input(countLocationsSchema)
    .query(({ ctx, input }) => {
      const count = countLocations(input, ctx.session.organizationId);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getLocationsSelectSchema)
    .query(({ ctx, input }) => {
      const locations = getLocationsSelect(input, ctx.session.organizationId);
      return locations;
    }),
  getBySlug: organizationProcedure
    .input(getLocationBySlugSchema)
    .query(async ({ input, ctx }) => {
      const { localId } = splitSlug(input.slug);

      const location = await getLocationByLocalId(
        localId,
        ctx.session.organizationId,
      );

      if (!location) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "location not found",
        });
      }

      return location;
    }),
  create: organizationProcedure
    .input(createLocationSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createInsertMetadata(ctx.session);
      const createdLocation = await createLocation({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      assertDatabaseResult(createdLocation);

      return createdLocation;
    }),
  update: organizationProcedure
    .input(updateLocationSchema)
    .mutation(async ({ input, ctx }) => {
      const { slug, ...values } = input;
      const { localId } = splitSlug(slug);
      const metadata = createUpdateMetadata(ctx.session);
      const updatedLocation = await updateLocation(
        {
          ...values,
          ...metadata,
        },
        localId,
        ctx.session.organizationId,
      );

      assertDatabaseResult(updatedLocation);

      return updatedLocation;
    }),
  archive: organizationProcedure
    .input(archiveLocationSchema)
    .mutation(async ({ input, ctx }) => {
      const { slug, ...values } = input;
      const { localId } = splitSlug(slug);
      const metadata = createArchiveMetadata(ctx.session);
      const archivedLocation = await archiveLocation(
        {
          ...values,
          ...metadata,
        },
        localId,
        ctx.session.organizationId,
      );

      assertDatabaseResult(archivedLocation);

      return archivedLocation;
    }),
});
