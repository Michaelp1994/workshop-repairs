import {
  createOrganizationSequenceService,
  updateOrganizationSequenceService,
} from "@repo/services/services/organizationSequence.service";
import {
  createOrganizationSequenceSchema,
  updateOrganizationSequenceSchema,
} from "@repo/validators/server/organizationSequences.validators";

import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  create: organizationProcedure
    .input(createOrganizationSequenceSchema)
    .mutation(async ({ input, ctx }) => {
      const createdModel = await createOrganizationSequenceService({
        ...input,
        organizationId: ctx.session.organizationId,
      });

      return createdModel;
    }),
  update: organizationProcedure
    .input(updateOrganizationSequenceSchema)
    .mutation(async ({ input: { id, ...values }, ctx }) => {
      const updatedModel = await updateOrganizationSequenceService(values, id);

      return updatedModel;
    }),
});
