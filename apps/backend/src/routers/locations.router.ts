import {
  archiveLocationService,
  countLocationsService,
  createLocationService,
  getAllLocationsService,
  getLocationService,
  getLocationsSelectService,
  updateLocationService,
} from "@repo/services/services/location.service";
import {
  archiveLocationSchema,
  countLocationsSchema,
  createLocationSchema,
  getAllLocationsSchema,
  getLocationBySlugSchema,
  getLocationsSelectSchema,
  updateLocationSchema,
} from "@repo/validators/server/locations.validators";

import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllLocationsSchema)
    .query(async ({ ctx, input }) => {
      const allLocations = await getAllLocationsService(input, ctx.session);

      return allLocations;
    }),
  countAll: organizationProcedure
    .input(countLocationsSchema)
    .query(async ({ ctx, input }) => {
      const count = await countLocationsService(input, ctx.session);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getLocationsSelectSchema)
    .query(async ({ ctx, input }) => {
      const locations = await getLocationsSelectService(input, ctx.session);
      return locations;
    }),
  getBySlug: organizationProcedure
    .input(getLocationBySlugSchema)
    .query(async ({ input, ctx }) => {
      const { localId } = splitSlug(input.slug);

      const location = await getLocationService(localId, ctx.session);

      return location;
    }),
  create: organizationProcedure
    .input(createLocationSchema)
    .mutation(async ({ input, ctx }) => {
      const createdLocation = await createLocationService(input, ctx.session);

      return createdLocation;
    }),
  update: organizationProcedure
    .input(updateLocationSchema)
    .mutation(async ({ input: { slug, ...values }, ctx }) => {
      const { localId } = splitSlug(slug);

      const updatedLocation = await updateLocationService(
        values,
        localId,
        ctx.session,
      );

      return updatedLocation;
    }),
  archive: organizationProcedure
    .input(archiveLocationSchema)
    .mutation(async ({ input, ctx }) => {
      const { localId } = splitSlug(input.slug);

      const archivedLocation = await archiveLocationService(
        localId,
        ctx.session,
      );

      return archivedLocation;
    }),
});
