import * as assetsController from "@repo/db/controllers/assets.controller";
import * as assetSchemas from "@repo/validators/assets.validators";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import { sanitizeUpdateInput } from "../helpers/sanitizeUpdateInput";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allAssets = await assetsController.getAll(
        input,
        ctx.session.organizationId,
      );
      return allAssets;
    }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(async ({ ctx, input }) => {
      const count = await assetsController.getCount(
        input,
        ctx.session.organizationId,
      );
      assertDatabaseResult(count);

      return count;
    }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ ctx, input }) => {
      const allAssets = await assetsController.getSelect(
        input,
        ctx.session.organizationId,
      );
      return allAssets;
    }),
  getSimpleSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ ctx, input }) => {
      const allAssets = await assetsController.getSimpleSelect(
        input,
        ctx.session.organizationId,
      );
      return allAssets;
    }),
  getById: organizationProcedure
    .input(assetSchemas.getById)
    .query(async ({ input, ctx }) => {
      const asset = await assetsController.getById(
        input.id,
        ctx.session.organizationId,
      );

      if (!asset) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "asset not found",
        });
      }

      return asset;
    }),
  getByRepairId: organizationProcedure
    .input(assetSchemas.getByRepairId)
    .query(async ({ input, ctx }) => {
      const asset = await assetsController.getByRepairId(
        input.id,
        ctx.session.organizationId,
      );

      if (!asset) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't find asset for repair",
        });
      }

      return asset;
    }),
  create: organizationProcedure
    .input(assetSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdAsset = await assetsController.create({
        ...input,
        ...metadata,
        organizationId: ctx.session.organizationId,
        statusId: 1,
      });

      assertDatabaseResult(createdAsset);
      return createdAsset;
    }),
  update: organizationProcedure
    .input(assetSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const sanitizedInput = sanitizeUpdateInput(input);
      const updatedAsset = await assetsController.update(
        { ...sanitizedInput, ...metadata },
        ctx.session.organizationId,
      );
      assertDatabaseResult(updatedAsset);

      return updatedAsset;
    }),
  archive: organizationProcedure
    .input(assetSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);

      const archivedAsset = await assetsController.archive(
        { ...input, ...metadata },
        ctx.session.organizationId,
      );
      assertDatabaseResult(archivedAsset);

      return archivedAsset;
    }),
});
