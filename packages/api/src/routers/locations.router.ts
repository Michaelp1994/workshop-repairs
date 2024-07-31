import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import locationsController from "@repo/db/controllers/locations.controller";
import locationSchemas from "@repo/validators/locations.validators";
import {
  createMetadata,
  deleteMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";

export default router({
  getAll: protectedProcedure.input(getAllSchema).query(({ ctx, input }) => {
    const allLocations = locationsController.getAll(input, ctx.db);

    return allLocations;
  }),
  getCount: protectedProcedure.input(getCountSchema).query(({ ctx, input }) => {
    const count = locationsController.getCount(input, ctx.db);
    return count;
  }),
  getSelect: protectedProcedure
    .input(getSelectSchema)
    .query(({ ctx, input }) => {
      const locations = locationsController.getSelect(input, ctx.db);
      return locations;
    }),
  getById: protectedProcedure
    .input(locationSchemas.getById)
    .query(async ({ input, ctx }) => {
      const location = await locationsController.getById(input.id, ctx.db);

      if (!location) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "location not found",
        });
      }

      return location;
    }),
  create: protectedProcedure
    .input(locationSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdLocation = await locationsController.create(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!createdLocation) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create location",
        });
      }

      return createdLocation;
    }),
  update: protectedProcedure
    .input(locationSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedLocation = await locationsController.update(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!updatedLocation) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update location",
        });
      }

      return updatedLocation;
    }),
  delete: protectedProcedure
    .input(locationSchemas.delete)
    .mutation(async ({ input, ctx }) => {
      const metadata = deleteMetadata(ctx.session);
      const deletedLocation = await locationsController.delete(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!deletedLocation) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't delete location",
        });
      }

      return deletedLocation;
    }),
});
