import * as repairTypesController from "@repo/db/controllers/repairTypes.controller";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import * as repairTypeSchemas from "@repo/validators/repairTypes.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import { protectedProcedure, router } from "../trpc";

export default router({
  getAll: protectedProcedure.input(getAllSchema).query(async ({ input }) => {
    const allRepairTypes = repairTypesController.getAll(input);
    return allRepairTypes;
  }),
  getCount: protectedProcedure.input(getCountSchema).query(({ input }) => {
    const count = repairTypesController.getCount(input);
    return count;
  }),
  getSelect: protectedProcedure
    .input(getSelectSchema)
    .query(async ({ input }) => {
      const allRepairTypes = await repairTypesController.getSelect(input);
      return allRepairTypes;
    }),
  getById: protectedProcedure
    .input(repairTypeSchemas.getById)
    .query(async ({ input }) => {
      const repairType = await repairTypesController.getById(input.id);

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
      const createdRepairType = await repairTypesController.create({
        ...input,
        ...metadata,
      });

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
      const updatedRepairType = await repairTypesController.update({
        ...input,
        ...metadata,
      });

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

      const archivedRepairType = await repairTypesController.archive({
        ...input,
        ...metadata,
      });

      if (!archivedRepairType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive repair Type",
        });
      }

      return archivedRepairType;
    }),
});
