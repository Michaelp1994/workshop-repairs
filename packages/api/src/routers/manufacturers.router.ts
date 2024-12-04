import {
  archiveManufacturer,
  countManufacturers,
  createManufacturer,
  getAllManufacturers,
  getManufacturerById,
  getManufacturersSelect,
  updateManufacturer,
} from "@repo/db/repositories/manufacturer.repository";
import {
  archiveManufacturerSchema,
  countManufacturersSchema,
  createManufacturerSchema,
  getAllManufacturersSchema,
  getManufacturerByIdSchema,
  getManufacturersSelectSchema,
  updateManufacturerSchema,
} from "@repo/validators/server/manufacturers.validators";
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
    .meta({ action: "read", entity: "manufacturers" })
    .input(getAllManufacturersSchema)
    .query(async ({ ctx, input }) => {
      const allManufacturers = await getAllManufacturers(
        input,
        ctx.session.organizationId,
      );

      return allManufacturers;
    }),
  countAll: organizationProcedure
    .meta({ action: "read", entity: "manufacturers" })
    .input(countManufacturersSchema)
    .query(({ ctx, input }) => {
      const count = countManufacturers(input, ctx.session.organizationId);
      return count;
    }),
  getSelect: organizationProcedure
    .meta({ action: "read", entity: "manufacturers" })
    .input(getManufacturersSelectSchema)
    .query(async ({ ctx, input }) => {
      const manufacturers = await getManufacturersSelect(
        input,
        ctx.session.organizationId,
      );

      return manufacturers;
    }),
  getById: organizationProcedure
    .meta({ action: "read", entity: "manufacturers" })
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
    .meta({ action: "create", entity: "manufacturers" })
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
    .meta({ action: "update", entity: "manufacturers" })
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
    .meta({ action: "delete", entity: "manufacturers" })
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
