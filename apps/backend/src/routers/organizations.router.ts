import OrganizationService from "../services/organization.service";
import {
  createOrganizationSchema,
  getOrganizationByIdSchema,
} from "../validators/organization.validators";

import { authedProcedure, organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function organizationRouter(
  organizationService: OrganizationService,
) {
  return router({
    get: organizationProcedure
      .input(getOrganizationByIdSchema)
      .query(async ({ ctx }) => {
        const organization = await organizationService.getOrganization(
          ctx.session.organizationId,
        );
        return organization;
      }),
    create: authedProcedure
      .input(createOrganizationSchema)
      .mutation(async ({ input, ctx }) => {
        return await organizationService.createOrganization(input, ctx.session);
      }),
  });
}
