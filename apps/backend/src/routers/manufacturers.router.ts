import {
  archiveManufacturerService,
  countManufacturersService,
  createManufacturerService,
  getAllManufacturersService,
  getManufacturerService,
  getManufacturersSelectService,
  updateManufacturerService,
} from "@repo/services/services/manufacturer.service";
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

import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllManufacturersSchema)
    .query(async ({ ctx, input }) => {
      const allManufacturers = await getAllManufacturersService(
        input,
        ctx.session,
      );

      return allManufacturers;
    }),
  countAll: organizationProcedure
    .input(countManufacturersSchema)
    .query(({ ctx, input }) => {
      const count = countManufacturersService(input, ctx.session);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getManufacturersSelectSchema)
    .query(async ({ ctx, input }) => {
      const manufacturers = await getManufacturersSelectService(
        input,
        ctx.session,
      );

      return manufacturers;
    }),
  getBySlug: organizationProcedure
    .input(getManufacturerBySlugSchema)
    .query(async ({ input, ctx }) => {
      const { localId } = splitSlug(input.slug);
      const manufacturer = await getManufacturerService(localId, ctx.session);

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
      const createdManufacturer = await createManufacturerService(
        input,
        ctx.session,
      );

      return createdManufacturer;
    }),
  update: organizationProcedure
    .input(updateManufacturerSchema)
    .mutation(async ({ input: { slug, ...values }, ctx }) => {
      const { localId } = splitSlug(slug);

      const updatedManufacturer = await updateManufacturerService(
        values,
        localId,
        ctx.session,
      );

      return updatedManufacturer;
    }),
  archive: organizationProcedure
    .input(archiveManufacturerSchema)
    .mutation(async ({ input, ctx }) => {
      const { localId } = splitSlug(input.slug);

      const archivedManufacturer = await archiveManufacturerService(
        localId,
        ctx.session,
      );

      return archivedManufacturer;
    }),
});
