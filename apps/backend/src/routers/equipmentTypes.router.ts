import {
  archiveEquipmentType,
  countEquipmentTypes,
  createEquipmentType,
  getAllEquipmentTypes,
  getEquipmentTypeByLocalId,
  getEquipmentTypesSelect,
  updateEquipmentType,
} from "@repo/db/repositories/equipmentType.repository";
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
    .input(getAllEquipmentTypesSchema)
    .query(async ({ ctx, input }) => {
      const allEquipmentTypes = getAllEquipmentTypes(
        input,
        ctx.session.organizationId,
      );

      return allEquipmentTypes;
    }),
  countAll: organizationProcedure
    .input(countEquipmentTypesSchema)
    .query(({ ctx, input }) => {
      const count = countEquipmentTypes(input, ctx.session.organizationId);
      return count;
    }),
  getSelect: organizationProcedure
    .input(getEquipmentTypesSelectSchema)
    .query(async ({ ctx, input }) => {
      const allEquipmentTypes = await getEquipmentTypesSelect(
        input,
        ctx.session.organizationId,
      );

      return allEquipmentTypes;
    }),
  getBySlug: organizationProcedure
    .input(getEquipmentTypeBySlugSchema)
    .query(async ({ ctx, input }) => {
      const { localId } = splitSlug(input.slug);

      const equipmentType = await getEquipmentTypeByLocalId(
        localId,
        ctx.session.organizationId,
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
      const metadata = createInsertMetadata(ctx.session);
      const createdEquipmentType = await createEquipmentType({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      assertDatabaseResult(createdEquipmentType);

      return createdEquipmentType;
    }),
  update: organizationProcedure
    .input(updateEquipmentTypeSchema)
    .mutation(async ({ input, ctx }) => {
      const { slug, ...values } = input;
      const { localId } = splitSlug(slug);
      const metadata = createUpdateMetadata(ctx.session);
      const updatedEquipmentType = await updateEquipmentType(
        {
          ...values,
          ...metadata,
        },
        localId,
        ctx.session.organizationId,
      );

      assertDatabaseResult(updatedEquipmentType);

      return updatedEquipmentType;
    }),
  archive: organizationProcedure
    .input(archiveEquipmentTypeSchema)
    .mutation(async ({ input, ctx }) => {
      const { slug, ...values } = input;
      const { localId } = splitSlug(slug);
      const metadata = createArchiveMetadata(ctx.session);

      const archivedEquipmentType = await archiveEquipmentType(
        {
          ...values,
          ...metadata,
        },
        localId,
        ctx.session.organizationId,
      );

      assertDatabaseResult(archivedEquipmentType);

      return archivedEquipmentType;
    }),
});
