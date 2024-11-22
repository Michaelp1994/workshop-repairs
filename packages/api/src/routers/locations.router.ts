import {
  archiveLocation,
  countLocations,
  createLocation,
  getAllLocations,
  getLocationById,
  getLocationsSelect,
  updateLocation,
} from "@repo/db/repositories/location.repository";
import {
  dataTableCountSchema,
  dataTableSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import {
  archiveLocationSchema,
  createLocationSchema,
  getLocationByIdSchema,
  updateLocationSchema,
} from "@repo/validators/server/locations.validators";
import { TRPCError } from "@trpc/server";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(dataTableSchema)
    .query(({ ctx, input }) => {
      const allLocations = getAllLocations(input, ctx.session.organizationId);

      return allLocations;
    }),
  countAll: organizationProcedure
    .input(dataTableCountSchema)
    .query(({ ctx, input }) => {
      const count = countLocations(input, ctx.session.organizationId);
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
      const metadata = createUpdateMetadata(ctx.session);
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
      const metadata = createArchiveMetadata(ctx.session);
      const archivedLocation = await archiveLocation({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedLocation);

      return archivedLocation;
    }),
});
