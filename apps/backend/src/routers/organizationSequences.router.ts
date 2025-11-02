import {
  createOrganizationSequence,
  updateOrganizationSequence,
} from "@repo/db/repositories/organizationSequence.repository";
import {
  createOrganizationSequenceSchema,
  updateOrganizationSequenceSchema,
} from "@repo/validators/server/organizationSequences.validators";

import {
  createInsertMetadata,
  createUpdateMetadata,
} from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  create: organizationProcedure
    .input(createOrganizationSequenceSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createInsertMetadata(ctx.session);

      const createdModel = await createOrganizationSequence({
        ...input,
        organizationId: ctx.session.organizationId,
        ...metadata,
      });

      assertDatabaseResult(createdModel);

      return createdModel;
    }),
  update: organizationProcedure
    .input(updateOrganizationSequenceSchema)
    .mutation(async ({ input, ctx }) => {
      const metadata = createUpdateMetadata(ctx.session);

      const updatedModel = await updateOrganizationSequence({
        ...input,
        ...metadata,
      });

      assertDatabaseResult(updatedModel);

      return updatedModel;
    }),
});
