import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import repairsController from "@repo/db/controllers/repairs.controller";
import repairSchemas from "@repo/validators/repairs.validators";
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
      const allRepairs = await repairsController.getAll(input, ctx.db);
      return allRepairs;
    }),
  getCount: protectedProcedure
    .input(getCountSchema)
    .query(async ({ ctx, input }) => {
      const count = await repairsController.getCount(input, ctx.db);
      if (count === undefined) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't count repairs",
        });
      }

      return count;
    }),
  getSelect: protectedProcedure
    .input(getSelectSchema)
    .query(async ({ ctx, input }) => {
      const allRepairs = await repairsController.getSelect(input, ctx.db);
      return allRepairs;
    }),
  getById: protectedProcedure
    .input(repairSchemas.getById)
    .query(async ({ input, ctx }) => {
      const repair = await repairsController.getById(input.id, ctx.db);

      if (!repair) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return repair;
    }),
  create: protectedProcedure
    .input(repairSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);

      const repair = await repairsController.create(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!repair) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create repair",
        });
      }

      return repair;
    }),

  update: protectedProcedure
    .input(repairSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);

      const updatedRepair = await repairsController.update(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!updatedRepair) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update repair",
        });
      }

      return updatedRepair;
    }),
  delete: protectedProcedure
    .input(repairSchemas.delete)
    .mutation(async ({ input, ctx }) => {
      const metadata = deleteMetadata(ctx.session);
      const deletedRepair = await repairsController.delete(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!deletedRepair) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't delete repair",
        });
      }

      return deletedRepair;
    }),
});
