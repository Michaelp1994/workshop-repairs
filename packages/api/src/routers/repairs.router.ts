import * as repairsController from "@repo/db/controllers/repairs.controller";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import * as repairSchemas from "@repo/validators/repairs.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import { sanitizeUpdateInput } from "../helpers/sanitizeUpdateInput";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allRepairs = await repairsController.getAll(
        input,
        ctx.session.organizationId,
      );
      return allRepairs;
    }),

  getCount: organizationProcedure
    .input(getCountSchema)
    .query(async ({ ctx, input }) => {
      const count = await repairsController.getCount(
        input,
        ctx.session.organizationId,
      );
      if (count === undefined) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't count repairs",
        });
      }
      return count;
    }),

  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ input }) => {
      const allRepairs = await repairsController.getSelect(input);
      return allRepairs;
    }),

  getById: organizationProcedure
    .input(repairSchemas.getById)
    .query(async ({ input }) => {
      const repair = await repairsController.getById(input.id);

      if (!repair) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return repair;
    }),

  create: organizationProcedure
    .input(repairSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);

      const repair = await repairsController.create({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      if (!repair) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create repair",
        });
      }

      return repair;
    }),

  update: organizationProcedure
    .input(repairSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const sanitizedInput = sanitizeUpdateInput(input);
      const updatedRepair = await repairsController.update({
        ...sanitizedInput,
        ...metadata,
      });

      if (!updatedRepair) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update repair",
        });
      }

      return updatedRepair;
    }),

  archive: organizationProcedure
    .input(repairSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedRepair = await repairsController.archive({
        ...input,
        ...metadata,
      });

      if (!archivedRepair) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive repair",
        });
      }

      return archivedRepair;
    }),
});
