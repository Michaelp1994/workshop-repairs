import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import partsController from "@repo/db/controllers/parts.controller";
import partSchemas from "@repo/validators/parts.validators";
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
  delete: protectedProcedure
    .input(partSchemas.delete)
    .mutation(async ({ input, ctx }) => {
      const metadata = deleteMetadata(ctx.session);

      const deletedPart = await partsController.delete(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!deletedPart) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't delete part",
        });
      }

      return deletedPart;
    }),
});
