import * as partsController from "@repo/db/controllers/parts.controller";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import * as partSchemas from "@repo/validators/parts.validators";
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
      const allParts = partsController.getAll(
        input,
        ctx.session.organizationId,
      );

      return allParts;
    }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(async ({ ctx, input }) => {
      const count = await partsController.getCount(
        input,
        ctx.session.organizationId,
      );

      return count;
    }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ input }) => {
      const allParts = await partsController.getSelect(input);

      return allParts;
    }),
  getById: organizationProcedure
    .input(partSchemas.getById)
    .query(async ({ input }) => {
      const part = await partsController.getById(input.id);

      if (!part) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "part not found",
        });
      }

      return part;
    }),
  create: organizationProcedure
    .input(partSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdPart = await partsController.create({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      if (!createdPart) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create part",
        });
      }

      return createdPart;
    }),
  update: organizationProcedure
    .input(partSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedPart = await partsController.update({
        ...input,
        ...metadata,
      });

      if (!updatedPart) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update part",
        });
      }

      return updatedPart;
    }),
  archive: organizationProcedure
    .input(partSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);

      const archivedPart = await partsController.archive({
        ...input,
        ...metadata,
      });

      if (!archivedPart) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive part",
        });
      }

      return archivedPart;
    }),
});
