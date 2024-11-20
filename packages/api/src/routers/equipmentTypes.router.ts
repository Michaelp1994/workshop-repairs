import {
  archiveEquipmentType,
  createEquipmentType,
  getAllEquipmentTypes,
  getEquipmentTypeById,
  getEquipmentTypesCount,
  getEquipmentTypesSelect,
  updateEquipmentType,
} from "@repo/db/repositories/equipmentType.repository";
import {
  getAllSchema,
  getCountSchema,
  getSelectSchema,
} from "@repo/validators/dataTables.validators";
import * as equipmentTypeSchemas from "@repo/validators/equipmentTypes.validators";
import { TRPCError } from "@trpc/server";

import {
  archiveMetadata,
  createMetadata,
  updateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  getAll: organizationProcedure
    .input(getAllSchema)
    .query(async ({ ctx, input }) => {
      const allEquipmentTypes = getAllEquipmentTypes(
        input,
        ctx.session.organizationId,
      );

      return allEquipmentTypes;
    }),
  getCount: organizationProcedure
    .input(getCountSchema)
    .query(({ ctx, input }) => {
      const count = getEquipmentTypesCount(input, ctx.session.organizationId);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getSelectSchema)
    .query(async ({ ctx, input }) => {
      const allEquipmentTypes = await getEquipmentTypesSelect(
        input,
        ctx.session.organizationId,
      );

      return allEquipmentTypes;
    }),
  getById: organizationProcedure
    .input(equipmentTypeSchemas.getById)
    .query(async ({ input }) => {
      const repairType = await getEquipmentTypeById(input.id);

      if (!repairType) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "repairType not found",
        });
      }

      return repairType;
    }),
  create: organizationProcedure
    .input(equipmentTypeSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const createdEquipmentType = await createEquipmentType({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      assertDatabaseResult(createdEquipmentType);

      return createdEquipmentType;
    }),
  update: organizationProcedure
    .input(equipmentTypeSchemas.update)
    .mutation(async ({ input, ctx }) => {
      const metadata = updateMetadata(ctx.session);
      const updatedEquipmentType = await updateEquipmentType({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedEquipmentType);

      return updatedEquipmentType;
    }),
  archive: organizationProcedure
    .input(equipmentTypeSchemas.archive)
    .mutation(async ({ input, ctx }) => {
      const metadata = archiveMetadata(ctx.session);

      const archivedEquipmentType = await archiveEquipmentType({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(archivedEquipmentType);

      return archivedEquipmentType;
    }),
});
