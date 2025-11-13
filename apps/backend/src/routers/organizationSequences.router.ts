import OrganizationSequenceService from "@repo/services/services/organizationSequence.service";
import {
  createOrganizationSequenceSchema,
  updateOrganizationSequenceSchema,
} from "@repo/validators/server/organizationSequences.validators";

import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function organizationSequenceRouter(
  organizationSequenceService: OrganizationSequenceService,
) {
  return router({
    create: organizationProcedure
      .input(createOrganizationSequenceSchema)
      .mutation(async ({ input, ctx }) => {
        const createdModel =
          await organizationSequenceService.createOrganizationSequence({
            ...input,
            organizationId: ctx.session.organizationId,
          });

        return createdModel;
      }),
    update: organizationProcedure
      .input(updateOrganizationSequenceSchema)
      .mutation(async ({ input: { id, ...values } }) => {
        const updatedModel =
          await organizationSequenceService.updateOrganizationSequence(
            values,
            id,
          );

        return updatedModel;
      }),
  });
}
