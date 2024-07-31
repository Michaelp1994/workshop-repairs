import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import repairTypesController from "@repo/db/controllers/repairTypes.controller";
import repairTypeSchemas from "@repo/validators/repairTypes.validators";
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
      const allRepairTypes = repairTypesController.getAll(input, ctx.db);

      return allRepairTypes;
    }),
  getCount: protectedProcedure.input(getCountSchema).query(({ ctx, input }) => {
    const count = repairTypesController.getCount(input, ctx.db);
    return count;
  }),
  getSelect: protectedProcedure
    .input(getSelectSchema)
    .query(async ({ ctx, input }) => {
      const allRepairTypes = await repairTypesController.getSelect(
        input,
        ctx.db,
      );

      return allRepairTypes;
    }),
  getById: protectedProcedure
    .input(repairTypeSchemas.getById)
    .query(async ({ input, ctx }) => {
      const repairType = await repairTypesController.getById(input.id, ctx.db);

      if (!repairType) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairType not found",
        });
      }

      return repairType;
    }),
  create: protectedProcedure
    .input(repairTypeSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdRepairType = await repairTypesController.create(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!createdRepairType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create repair Type",
        });
      }

      return createdRepairType;
    }),
  update: protectedProcedure
    .input(repairTypeSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedRepairType = await repairTypesController.update(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!updatedRepairType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update repair Type",
        });
      }

      return updatedRepairType;
    }),
  delete: protectedProcedure
    .input(repairTypeSchemas.delete)
    .mutation(async ({ input, ctx }) => {
      const metadata = deleteMetadata(ctx.session);

      const deletedRepairType = await repairTypesController.delete(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!deletedRepairType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't delete repair Type",
        });
      }

      return deletedRepairType;
    }),
});
