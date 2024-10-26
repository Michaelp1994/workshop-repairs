import * as manufacturersController from "@repo/db/controllers/manufacturers.controller";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import * as manufacturerSchemas from "@repo/validators/manufacturers.validators";
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
      const allManufacturers = await manufacturersController.getAll(
        input,
        ctx.db,
      );

      return allManufacturers;
    }),
  getCount: protectedProcedure.input(getCountSchema).query(({ ctx, input }) => {
    const count = manufacturersController.getCount(input, ctx.db);
    return count;
  }),
  getSelect: protectedProcedure
    .input(getSelectSchema)
    .query(async ({ ctx, input }) => {
      const manufacturers = await manufacturersController.getSelect(
        input,
        ctx.db,
      );

      return manufacturers;
    }),
  getById: protectedProcedure
    .input(manufacturerSchemas.getById)
    .query(async ({ input, ctx }) => {
      const manufacturer = await manufacturersController.getById(
        input.id,
        ctx.db,
      );

      if (!manufacturer) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "manufacturer not found",
        });
      }

      return manufacturer;
    }),
  create: protectedProcedure
    .input(manufacturerSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdManufacturer = await manufacturersController.create(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!createdManufacturer) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create manufacturer",
        });
      }

      return createdManufacturer;
    }),
  update: protectedProcedure
    .input(manufacturerSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedManufacturer = await manufacturersController.update(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!updatedManufacturer) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't update manufacturer",
        });
      }

      return updatedManufacturer;
    }),
  archive: protectedProcedure
    .input(manufacturerSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedManufacturer = await manufacturersController.archive(
        { ...input, ...metadata },
        ctx.db,
      );

      if (!archivedManufacturer) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't archive manufacturer",
        });
      }

      return archivedManufacturer;
    }),
});
