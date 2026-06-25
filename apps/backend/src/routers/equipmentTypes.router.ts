import EquipmentTypeService from "../services/equipmentType.service";
import {
  archiveEquipmentTypeSchema,
  countEquipmentTypesSchema,
  createEquipmentTypeSchema,
  getAllEquipmentTypesSchema,
  getEquipmentTypeByIdSchema,
  getEquipmentTypesSelectSchema,
  updateEquipmentTypeSchema,
} from "../validators/equipmentTypes.validators";

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
    getById: organizationProcedure
      .input(getEquipmentTypeByIdSchema)
      .query(async ({ ctx, input }) => {
        const { localId } = splitSlug(input.id);

        const equipmentType = await equipmentTypeService.getEquipmentType(
          localId,
          ctx.session,
        );

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
      .mutation(async ({ input: { id, ...values }, ctx }) => {
        const { localId } = splitSlug(id);

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
        const { localId } = splitSlug(input.id);

        const archivedEquipmentType =
          await equipmentTypeService.archiveEquipmentType(localId, ctx.session);

        return archivedEquipmentType;
      }),
  });
}
