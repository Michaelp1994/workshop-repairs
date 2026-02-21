import EquipmentTypeService from "@repo/services/services/equipmentType.service";
import {
  archiveEquipmentTypeSchema,
  countEquipmentTypesSchema,
  createEquipmentTypeSchema,
  getAllEquipmentTypesSchema,
  getEquipmentTypeBySlugSchema,
  getEquipmentTypesSelectSchema,
  updateEquipmentTypeSchema,
} from "@repo/validators/server/equipmentTypes.validators";
import { TRPCError } from "@trpc/server";

import { splitSlug } from "../helpers/splitUrlSlug";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function equipmentTypeRouter(
  equipmentTypeService: EquipmentTypeService,
) {
  return router({
    getAll: organizationProcedure
      .input(getAllEquipmentTypesSchema)
      .query(async ({ ctx, input }) => {
        const allEquipmentTypes =
          await equipmentTypeService.getAllEquipmentTypes(input, ctx.session);

        return allEquipmentTypes;
      }),
    countAll: organizationProcedure
      .input(countEquipmentTypesSchema)
      .query(async ({ ctx, input }) => {
        const count = await equipmentTypeService.countEquipmentTypes(
          input,
          ctx.session,
        );
        return count;
      }),
    getSelect: organizationProcedure
      .input(getEquipmentTypesSelectSchema)
      .query(async ({ ctx, input }) => {
        const allEquipmentTypes =
          await equipmentTypeService.getEquipmentTypesSelect(
            input,
            ctx.session,
          );

        return allEquipmentTypes;
      }),
    getBySlug: organizationProcedure
      .input(getEquipmentTypeBySlugSchema)
      .query(async ({ ctx, input }) => {
        const { localId } = splitSlug(input.slug);

        const equipmentType = await equipmentTypeService.getEquipmentType(
          localId,
          ctx.session,
        );

        if (!equipmentType) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "can't find Equipment Type",
          });
        }
        return equipmentType;
      }),
    create: organizationProcedure
      .input(createEquipmentTypeSchema)
      .mutation(async ({ input, ctx }) => {
        const createdEquipmentType =
          await equipmentTypeService.createEquipmentType(input, ctx.session);

        return createdEquipmentType;
      }),
    update: organizationProcedure
      .input(updateEquipmentTypeSchema)
      .mutation(async ({ input: { slug, ...values }, ctx }) => {
        const { localId } = splitSlug(slug);

        const updatedEquipmentType =
          await equipmentTypeService.updateEquipmentType(
            values,
            localId,
            ctx.session,
          );

        return updatedEquipmentType;
      }),
    archive: organizationProcedure
      .input(archiveEquipmentTypeSchema)
      .mutation(async ({ input, ctx }) => {
        const { localId } = splitSlug(input.slug);

        const archivedEquipmentType =
          await equipmentTypeService.archiveEquipmentType(localId, ctx.session);

        return archivedEquipmentType;
      }),
  });
}
