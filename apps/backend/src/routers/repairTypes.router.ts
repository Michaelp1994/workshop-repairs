import {
  archiveRepairTypeService,
  countRepairTypesService,
  createRepairTypeService,
  getAllRepairTypesService,
  getRepairTypeByIdService,
  getRepairTypesSelectService,
  updateRepairTypeService,
} from "@repo/services/services/repairType.service";
import {
  archiveRepairTypeSchema,
  countRepairTypesSchema,
  createRepairTypeSchema,
  getAllRepairTypesSchema,
  getRepairTypeByIdSchema,
  getRepairTypesSelectSchema,
  updateRepairTypeSchema,
} from "@repo/validators/server/repairTypes.validators";
import { TRPCError } from "@trpc/server";

import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllRepairTypesSchema)
    .query(async ({ input, ctx }) => {
      const allRepairTypes = getAllRepairTypesService(input, ctx.session);
      return allRepairTypes;
    }),
  countAll: organizationProcedure
    .input(countRepairTypesSchema)
    .query(({ input, ctx }) => {
      const count = countRepairTypesService(input, ctx.session);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getRepairTypesSelectSchema)
    .query(async ({ input, ctx }) => {
      const allRepairTypes = await getRepairTypesSelectService(
        input,
        ctx.session,
      );
      return allRepairTypes;
    }),
  getById: organizationProcedure
    .input(getRepairTypeByIdSchema)
    .query(async ({ input, ctx }) => {
      const repairType = await getRepairTypeByIdService(input.id, ctx.session);

      if (!repairType) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairType not found",
        });
      }
      return repairType;
    }),
  create: organizationProcedure
    .input(createRepairTypeSchema)
    .mutation(async ({ input, ctx }) => {
      const createdRepairType = await createRepairTypeService(
        input,
        ctx.session,
      );
      return createdRepairType;
    }),
  update: organizationProcedure
    .input(updateRepairTypeSchema)
    .mutation(async ({ input: { id, ...values }, ctx }) => {
      const updatedRepairType = await updateRepairTypeService(
        values,
        id,
        ctx.session,
      );
      return updatedRepairType;
    }),
  archive: organizationProcedure
    .input(archiveRepairTypeSchema)
    .mutation(async ({ input, ctx }) => {
      const archivedRepairType = await archiveRepairTypeService(
        input.id,
        ctx.session,
      );
      return archivedRepairType;
    }),
});
