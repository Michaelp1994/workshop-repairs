import repairTypesController from "@repo/db/controllers/repairTypes.controller";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import repairTypeSchemas from "@repo/validators/repairTypes.validators";
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
  archive: protectedProcedure
    .input(repairTypeSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);

      const archivedRepairType = await repairTypesController.archive(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!archivedRepairType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive repair Type",
        });
      }

      return archivedRepairType;
    }),
});
