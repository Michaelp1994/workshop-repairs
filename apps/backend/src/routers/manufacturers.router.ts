import ManufacturerService from "@repo/services/services/manufacturer.service";
import {
  archiveManufacturerSchema,
  countManufacturersSchema,
  createManufacturerSchema,
  getAllManufacturersSchema,
  getManufacturerBySlugSchema,
  getManufacturersSelectSchema,
  updateManufacturerSchema,
} from "@repo/validators/server/manufacturers.validators";

import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function manufacturerRouter(
  manufacturerService: ManufacturerService,
) {
  return router({
    getAll: organizationProcedure
      .input(getAllManufacturersSchema)
      .query(async ({ ctx, input }) => {
        const allManufacturers = await manufacturerService.getAllManufacturers(
          input,
          ctx.session,
        );

        return allManufacturers;
      }),
    countAll: organizationProcedure
      .input(countManufacturersSchema)
      .query(async ({ ctx, input }) => {
        const count = await manufacturerService.countManufacturers(
          input,
          ctx.session,
        );
        return count;
      }),
    getSelect: organizationProcedure
      .input(getManufacturersSelectSchema)
      .query(async ({ ctx, input }) => {
        const manufacturers = await manufacturerService.getManufacturersSelect(
          input,
          ctx.session,
        );

        return manufacturers;
      }),
    getBySlug: organizationProcedure
      .input(getManufacturerBySlugSchema)
      .query(async ({ input, ctx }) => {
        const { localId } = splitSlug(input.slug);
        const manufacturer = await manufacturerService.getManufacturer(
          localId,
          ctx.session,
        );

        return manufacturer;
      }),
    create: organizationProcedure
      .input(createManufacturerSchema)
      .mutation(async ({ input, ctx }) => {
        const createdManufacturer =
          await manufacturerService.createManufacturer(input, ctx.session);

        return createdManufacturer;
      }),
    update: organizationProcedure
      .input(updateManufacturerSchema)
      .mutation(async ({ input: { slug, ...values }, ctx }) => {
        const { localId } = splitSlug(slug);

        const updatedManufacturer =
          await manufacturerService.updateManufacturer(
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

        const archivedManufacturer =
          await manufacturerService.archiveManufacturer(localId, ctx.session);

        return archivedManufacturer;
      }),
  });
}
