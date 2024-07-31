import assetsController from "@repo/db/controllers/assets.controller";
import {
  createAssetSchema,
  deleteAssetSchema,
  getAssetByIdSchema,
  getAssetByRepairIdSchema,
  updateAssetSchema,
} from "@repo/validators/assets.validators";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import { TRPCError } from "@trpc/server";

import {
  createMetadata,
  deleteMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import { protectedProcedure, router } from "../trpc";

export default router({
  getAll: protectedProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allAssets = await assetsController.getAll(input, ctx.db);
      return allAssets;
    }),
  getCount: protectedProcedure
    .input(getCountSchema)
    .query(async ({ ctx, input }) => {
      const count = await assetsController.getCount(input, ctx.db);

      if (count === undefined) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't get count for total assets",
        });
      }
      return count;
    }),
  getSelect: protectedProcedure
    .input(getSelectSchema)
    .query(async ({ ctx, input }) => {
      const allAssets = await assetsController.getSelect(input, ctx.db);
      return allAssets;
    }),
  getById: protectedProcedure
    .input(getAssetByIdSchema)
    .query(async ({ input, ctx }) => {
      const asset = await assetsController.getById(input.id, ctx.db);

      if (!asset) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "asset not found",
        });
      }

      return asset;
    }),
  getByRepairId: protectedProcedure
    .input(getAssetByRepairIdSchema)
    .query(async ({ input, ctx }) => {
      const asset = await assetsController.getByRepairId(input.id, ctx.db);

      if (!asset) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "can't find asset for repair",
        });
      }

      return asset;
    }),
  create: protectedProcedure
    .input(createAssetSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdAsset = await assetsController.create(
        {
          ...input,
          ...metadata,
          statusId: 1,
        },
        ctx.db,
      );

      if (!createdAsset) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create asset",
        });
      }

      return createdAsset;
    }),
  update: protectedProcedure
    .input(updateAssetSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedAsset = await assetsController.update(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!updatedAsset) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update asset",
        });
      }

      return updatedAsset;
    }),
  delete: protectedProcedure
    .input(deleteAssetSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = deleteMetadata(ctx.session);

      const deletedAsset = await assetsController.delete(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!deletedAsset) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't delete asset",
        });
      }

      return deletedAsset;
    }),
});
