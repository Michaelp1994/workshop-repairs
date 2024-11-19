import * as repairPartsController from "@repo/db/controllers/repairParts.controller";
import {
  getAllSchema,
  getCountSchema,
} from "@repo/validators/dataTables.validators";
import * as repairPartSchemas from "@repo/validators/repairParts.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure.input(getAllSchema).query(async ({ input }) => {
    const allRepairParts = repairPartsController.getAll(input);

    return allRepairParts;
  }),
  getCount: organizationProcedure.input(getCountSchema).query(({ input }) => {
    const count = repairPartsController.getCount(input);
    return count;
  }),
  getById: organizationProcedure
    .input(repairPartSchemas.getById)
    .query(async ({ input }) => {
      const repairPart = await repairPartsController.getById(input.id);

      if (!repairPart) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairPart not found",
        });
      }

      return repairPart;
    }),
  getAllByRepairId: organizationProcedure
    .input(repairPartSchemas.getAllByRepairId)
    .query(async ({ input }) => {
      const allRepairParts = await repairPartsController.getAllByRepairId(
        input.id,
      );

      return allRepairParts;
    }),
  create: organizationProcedure
    .input(repairPartSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdRepairPart = await repairPartsController.create({
        ...input,
        ...metadata,
      });

      if (!createdRepairPart) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create repair Part",
        });
      }

      return createdRepairPart;
    }),
  update: organizationProcedure
    .input(repairPartSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedRepairPart = await repairPartsController.update({
        ...input,
        ...metadata,
      });

      if (!updatedRepairPart) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update repairPart",
        });
      }

      return updatedRepairPart;
    }),
  archive: organizationProcedure
    .input(repairPartSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedRepairPart = await repairPartsController.archive({
        ...input,
        ...metadata,
      });

      if (!archivedRepairPart) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive repair Part",
        });
      }

      return archivedRepairPart;
    }),
});
