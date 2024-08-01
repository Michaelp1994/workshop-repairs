import partsController from "@repo/db/controllers/parts.controller";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import partSchemas from "@repo/validators/parts.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import { protectedProcedure, router } from "../trpc";

export default router({
  getAll: protectedProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allParts = partsController.getAll(input, ctx.db);

      return allParts;
    }),
  getCount: protectedProcedure
    .input(getCountSchema)
    .query(async ({ ctx, input }) => {
      const count = await partsController.getCount(input, ctx.db);

      return count;
    }),
  getSelect: protectedProcedure
    .input(getSelectSchema)
    .query(async ({ ctx, input }) => {
      const allParts = await partsController.getSelect(input, ctx.db);

      return allParts;
    }),
  getById: protectedProcedure
    .input(partSchemas.getById)
    .query(async ({ input, ctx }) => {
      const part = await partsController.getById(input.id, ctx.db);

      if (!part) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "part not found",
        });
      }

      return part;
    }),
  create: protectedProcedure
    .input(partSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdPart = await partsController.create(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!createdPart) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create part",
        });
      }

      return createdPart;
    }),
  update: protectedProcedure
    .input(partSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedPart = await partsController.update(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!updatedPart) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update part",
        });
      }

      return updatedPart;
    }),
  archive: protectedProcedure
    .input(partSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);

      const archivedPart = await partsController.archive(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!archivedPart) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive part",
        });
      }

      return archivedPart;
    }),
});
