import RepairTypeService from "../services/repairType.service";
import {
  archiveRepairTypeSchema,
  countRepairTypesSchema,
  createRepairTypeSchema,
  getAllRepairTypesSchema,
  getRepairTypeByIdSchema,
  getRepairTypesSelectSchema,
  updateRepairTypeSchema,
} from "../validators/repairTypes.validators";

import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function Router(repairTypeService: RepairTypeService) {
  return router({
    getAll: organizationProcedure
      .input(getAllRepairTypesSchema)
      .query(async ({ input, ctx }) => {
        const allRepairTypes = await repairTypeService.getAllRepairTypes(
          input,
          ctx.session,
        );
        return allRepairTypes;
      }),
    countAll: organizationProcedure
      .input(countRepairTypesSchema)
      .query(async ({ input, ctx }) => {
        const count = await repairTypeService.countRepairTypes(
          input,
          ctx.session,
        );
        return count;
      }),
    getSelect: organizationProcedure
      .input(getRepairTypesSelectSchema)
      .query(async ({ input, ctx }) => {
        const allRepairTypes = await repairTypeService.getRepairTypesSelect(
          input,
          ctx.session,
        );
        return allRepairTypes;
      }),
    getById: organizationProcedure
      .input(getRepairTypeByIdSchema)
      .query(async ({ input, ctx }) => {
        const repairType = await repairTypeService.getRepairTypeById(
          input.id,
          ctx.session,
        );

        return repairType;
      }),
    create: organizationProcedure
      .input(createRepairTypeSchema)
      .mutation(async ({ input, ctx }) => {
        const createdRepairType = await repairTypeService.createRepairType(
          input,
          ctx.session,
        );
        return createdRepairType;
      }),
    update: organizationProcedure
      .input(updateRepairTypeSchema)
      .mutation(async ({ input: { id, ...values }, ctx }) => {
        const updatedRepairType = await repairTypeService.updateRepairType(
          values,
          id,
          ctx.session,
        );
        return updatedRepairType;
      }),
    archive: organizationProcedure
      .input(archiveRepairTypeSchema)
      .mutation(async ({ input, ctx }) => {
        const archivedRepairType = await repairTypeService.archiveRepairType(
          input.id,
          ctx.session,
        );
        return archivedRepairType;
      }),
  });
}
