import * as repairStatusTypesController from "@repo/db/controllers/repairStatusTypes.controller";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import * as repairStatusTypeSchemas from "@repo/validators/repairStatusTypes.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allRepairStatusTypes = repairStatusTypesController.getAll(
        input,
        ctx.db,
      );

      return allRepairStatusTypes;
    }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ ctx, input }) => {
      const allRepairStatusTypes = await repairStatusTypesController.getSelect(
        input,
        ctx.db,
      );
      return allRepairStatusTypes;
    }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(({ ctx, input }) => {
      const count = repairStatusTypesController.getCount(input, ctx.db);
      return count;
    }),
  getById: organizationProcedure
    .input(repairStatusTypeSchemas.getById)
    .query(async ({ input, ctx }) => {
      const repairStatusType = await repairStatusTypesController.getById(
        input.id,
        ctx.db,
      );

      if (!repairStatusType) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairStatusType not found",
        });
      }

      return repairStatusType;
    }),
  create: organizationProcedure
    .input(repairStatusTypeSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdRepairStatusType = await repairStatusTypesController.create(
        { ...input, ...metadata },
        ctx.db,
      );
      if (!createdRepairStatusType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create repair Status Type",
        });
      }

      return createdRepairStatusType;
    }),
  update: organizationProcedure
    .input(repairStatusTypeSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedRepairStatusType = await repairStatusTypesController.update(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!updatedRepairStatusType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update repair Status Type",
        });
      }

      return updatedRepairStatusType;
    }),
  archive: organizationProcedure
    .input(repairStatusTypeSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedRepairStatusType =
        await repairStatusTypesController.archive(
          { ...input, ...metadata },
          ctx.db,
        );

      if (!archivedRepairStatusType) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive repair Status Type",
        });
      }

      return archivedRepairStatusType;
    }),
});
