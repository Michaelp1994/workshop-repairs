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
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure.input(getAllSchema).query(({ ctx, input }) => {
    const allLocations = locationsController.getAll(
      input,
      ctx.session.organizationId,
    );

    return allLocations;
  }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(({ ctx, input }) => {
      const count = locationsController.getCount(
        input,
        ctx.session.organizationId,
      );
      return count;
    }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(({ ctx, input }) => {
      const locations = locationsController.getSelect(
        input,
        ctx.session.organizationId,
      );
      return locations;
    }),
  getById: organizationProcedure
    .input(locationSchemas.getById)
    .query(async ({ input }) => {
      const location = await locationsController.getById(input.id);

      if (!location) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "location not found",
        });
      }

      return location;
    }),
  create: organizationProcedure
    .input(locationSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdLocation = await locationsController.create({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      if (!createdLocation) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create location",
        });
      }

      return createdLocation;
    }),
  update: organizationProcedure
    .input(locationSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedLocation = await locationsController.update({
        ...input,
        ...metadata,
      });

      if (!updatedLocation) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update location",
        });
      }

      return updatedLocation;
    }),
  archive: organizationProcedure
    .input(locationSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedLocation = await locationsController.archive({
        ...input,
        ...metadata,
      });

      if (!archivedLocation) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive location",
        });
      }

      return archivedLocation;
    }),
});
