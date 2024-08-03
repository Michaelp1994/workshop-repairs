import * as locationsController from "@repo/db/controllers/locations.controller";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import * as locationSchemas from "@repo/validators/locations.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import { protectedProcedure, router } from "../trpc";

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
  archive: protectedProcedure
    .input(locationSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedLocation = await locationsController.archive(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!archivedLocation) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive location",
        });
      }

      return archivedLocation;
    }),
});
