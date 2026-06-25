import LocationService from "../services/location.service";
import {
  archiveLocationSchema,
  countLocationsSchema,
  createLocationSchema,
  getAllLocationsSchema,
  getLocationByIdSchema,
  getLocationsSelectSchema,
  updateLocationSchema,
} from "../validators/locations.validators";

import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function locationRouter(locationService: LocationService) {
  return router({
    getAll: organizationProcedure
      .input(getAllLocationsSchema)
      .query(async ({ ctx, input }) => {
        const allLocations = await locationService.getAllLocations(
          input,
          ctx.session,
        );

        return allLocations;
      }),
    countAll: organizationProcedure
      .input(countLocationsSchema)
      .query(async ({ ctx, input }) => {
        const count = await locationService.countLocations(input, ctx.session);
        return count;
      }),
    getSelect: organizationProcedure
      .input(getLocationsSelectSchema)
      .query(async ({ ctx, input }) => {
        const locations = await locationService.getLocationsSelect(
          input,
          ctx.session,
        );
        return locations;
      }),
    getById: organizationProcedure
      .input(getLocationByIdSchema)
      .query(async ({ input, ctx }) => {
        const { localId } = splitSlug(input.id);

        const location = await locationService.getLocation(
          localId,
          ctx.session,
        );

        return location;
      }),
    create: organizationProcedure
      .input(createLocationSchema)
      .mutation(async ({ input, ctx }) => {
        const createdLocation = await locationService.createLocation(
          input,
          ctx.session,
        );

        return createdLocation;
      }),
    update: organizationProcedure
      .input(updateLocationSchema)
      .mutation(async ({ input: { id, ...values }, ctx }) => {
        const { localId } = splitSlug(id);

        const updatedLocation = await locationService.updateLocation(
          values,
          localId,
          ctx.session,
        );

        return updatedLocation;
      }),
    archive: organizationProcedure
      .input(archiveLocationSchema)
      .mutation(async ({ input, ctx }) => {
        const { localId } = splitSlug(input.id);

        const archivedLocation = await locationService.archiveLocation(
          localId,
          ctx.session,
        );

        return archivedLocation;
      }),
  });
}
