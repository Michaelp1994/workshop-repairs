import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import ManufacturerService from "../services/manufacturer.service";
import { router } from "../trpc";
import {
  archiveManufacturerSchema,
  countManufacturersSchema,
  createManufacturerSchema,
  getAllManufacturersSchema,
  getManufacturerByIdSchema,
  getManufacturersSelectSchema,
  updateManufacturerSchema,
} from "../validators/manufacturers.validators";

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
    getById: organizationProcedure
      .input(getManufacturerByIdSchema)
      .query(async ({ input, ctx }) => {
        const { localId } = splitSlug(input.id);
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
      .mutation(async ({ input: { id, ...values }, ctx }) => {
        const { localId } = splitSlug(id);

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
        const { localId } = splitSlug(input.id);

        const archivedManufacturer =
          await manufacturerService.archiveManufacturer(localId, ctx.session);

        return archivedManufacturer;
      }),
  });
}
