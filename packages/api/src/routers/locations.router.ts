import {
  archiveLocation,
  createLocation,
  getAllLocations,
  getLocationById,
  getLocationsCount,
  getLocationsSelect,
  updateLocation,
} from "@repo/db/repositories/location.repository";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import {
  archiveLocationSchema,
  createLocationSchema,
  getLocationByIdSchema,
  updateLocationSchema,
} from "@repo/validators/locations.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure.input(getAllSchema).query(({ ctx, input }) => {
    const allLocations = getAllLocations(input, ctx.session.organizationId);

    return allLocations;
  }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(({ ctx, input }) => {
      const count = getLocationsCount(input, ctx.session.organizationId);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(({ ctx, input }) => {
      const locations = getLocationsSelect(input, ctx.session.organizationId);
      return locations;
    }),
  getById: organizationProcedure
    .input(getLocationByIdSchema)
    .query(async ({ input }) => {
      const location = await getLocationById(input.id);

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
      const metadata = createMetadata(ctx.session);
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
      const metadata = updateMetadata(ctx.session);
      const updatedLocation = await updateLocation({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedLocation);

      return updatedLocation;
    }),
  archive: organizationProcedure
    .input(archiveLocationSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedLocation = await archiveLocation({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedLocation);

      return archivedLocation;
    }),
});
