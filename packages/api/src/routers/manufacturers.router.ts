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
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allManufacturers = await manufacturersController.getAll(
        input,
        ctx.session.organizationId,
      );

      return allManufacturers;
    }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(({ ctx, input }) => {
      const count = manufacturersController.getCount(
        input,
        ctx.session.organizationId,
      );
      return count;
    }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ ctx, input }) => {
      const manufacturers = await manufacturersController.getSelect(
        input,
        ctx.session.organizationId,
      );

      return manufacturers;
    }),
  getById: organizationProcedure
    .input(manufacturerSchemas.getById)
    .query(async ({ input }) => {
      const manufacturer = await manufacturersController.getById(input.id);

      if (!manufacturer) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "manufacturer not found",
        });
      }

      return manufacturer;
    }),
  create: organizationProcedure
    .input(manufacturerSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdManufacturer = await manufacturersController.create({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      assertDatabaseResult(createdManufacturer);

      return createdManufacturer;
    }),
  update: organizationProcedure
    .input(manufacturerSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedManufacturer = await manufacturersController.update({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedManufacturer);

      return updatedManufacturer;
    }),
  archive: organizationProcedure
    .input(manufacturerSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);
      const archivedManufacturer = await manufacturersController.archive({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedManufacturer);

      return archivedManufacturer;
    }),
});
