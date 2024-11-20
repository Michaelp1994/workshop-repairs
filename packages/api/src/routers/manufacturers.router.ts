import {
  archiveManufacturer,
  createManufacturer,
  getAllManufacturers,
  getManufacturerById,
  getManufacturersCount,
  getManufacturersSelect,
  updateManufacturer,
} from "@repo/db/repositories/manufacturer.repository";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import {
  archiveManufacturerSchema,
  createManufacturerSchema,
  getManufacturerByIdSchema,
  updateManufacturerSchema,
} from "@repo/validators/manufacturers.validators";
import { TRPCError } from "@trpc/server";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allManufacturers = await getAllManufacturers(
        input,
        ctx.session.organizationId,
      );

      return allManufacturers;
    }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(({ ctx, input }) => {
      const count = getManufacturersCount(input, ctx.session.organizationId);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ ctx, input }) => {
      const manufacturers = await getManufacturersSelect(
        input,
        ctx.session.organizationId,
      );

      return manufacturers;
    }),
  getById: organizationProcedure
    .input(getManufacturerByIdSchema)
    .query(async ({ input }) => {
      const manufacturer = await getManufacturerById(input.id);

      if (!manufacturer) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "manufacturer not found",
        });
      }

      return manufacturer;
    }),
  create: organizationProcedure
    .input(createManufacturerSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createInsertMetadata(ctx.session);
      const createdManufacturer = await createManufacturer({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      assertDatabaseResult(createdManufacturer);

      return createdManufacturer;
    }),
  update: organizationProcedure
    .input(updateManufacturerSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);
      const updatedManufacturer = await updateManufacturer({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedManufacturer);

      return updatedManufacturer;
    }),
  archive: organizationProcedure
    .input(archiveManufacturerSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createArchiveMetadata(ctx.session);
      const archivedManufacturer = await archiveManufacturer({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedManufacturer);

      return archivedManufacturer;
    }),
});
