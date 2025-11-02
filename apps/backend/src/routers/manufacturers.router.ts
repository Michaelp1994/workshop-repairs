import {
  archiveManufacturer,
  countManufacturers,
  createManufacturer,
  getAllManufacturers,
  getManufacturerByLocalId,
  getManufacturersSelect,
  updateManufacturer,
} from "@repo/db/repositories/manufacturer.repository";
import {
  archiveManufacturerSchema,
  countManufacturersSchema,
  createManufacturerSchema,
  getAllManufacturersSchema,
  getManufacturerBySlugSchema,
  getManufacturersSelectSchema,
  updateManufacturerSchema,
} from "@repo/validators/server/manufacturers.validators";
import { TRPCError } from "@trpc/server";

import {
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import { splitSlug } from "../helpers/splitUrlSlug";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllManufacturersSchema)
    .query(async ({ ctx, input }) => {
      const allManufacturers = await getAllManufacturers(
        input,
        ctx.session.organizationId,
      );

      return allManufacturers;
    }),
  countAll: organizationProcedure
    .input(countManufacturersSchema)
    .query(({ ctx, input }) => {
      const count = countManufacturers(input, ctx.session.organizationId);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getManufacturersSelectSchema)
    .query(async ({ ctx, input }) => {
      const manufacturers = await getManufacturersSelect(
        input,
        ctx.session.organizationId,
      );

      return manufacturers;
    }),
  getBySlug: organizationProcedure
    .input(getManufacturerBySlugSchema)
    .query(async ({ input, ctx }) => {
      const { localId } = splitSlug(input.slug);
      const manufacturer = await getManufacturerByLocalId(
        localId,
        ctx.session.organizationId,
      );

      if (!manufacturer) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Manufacturer not found",
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
      const { slug, ...values } = input;
      const { localId } = splitSlug(slug);
      const metadata = createUpdateMetadata(ctx.session);

      const updatedManufacturer = await updateManufacturer(
        {
          ...values,
          ...metadata,
        },
        localId,
        ctx.session.organizationId,
      );

      assertDatabaseResult(updatedManufacturer);

      return updatedManufacturer;
    }),
  archive: organizationProcedure
    .input(archiveManufacturerSchema)
    .mutation(async ({ input, ctx }) => {
      const { slug, ...values } = input;
      const { localId } = splitSlug(slug);
      const metadata = createArchiveMetadata(ctx.session);
      const archivedManufacturer = await archiveManufacturer(
        {
          ...values,
          ...metadata,
        },
        localId,
        ctx.session.organizationId,
      );

      assertDatabaseResult(archivedManufacturer);

      return archivedManufacturer;
    }),
});
