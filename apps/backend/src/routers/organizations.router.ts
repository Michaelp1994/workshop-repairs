import OrganizationService from "@repo/services/services/organization.service";
import { getOrganizationByIdSchema } from "@repo/validators/server/organization.validators";

import { getOrganizationLogoUrlFromKey } from "../../../../packages/services/src/helpers/s3";
import { organizationProcedure } from "../procedures";
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

        return {
          ...organization,
          logo: organization.logo
            ? getOrganizationLogoUrlFromKey(organization.logo)
            : null,
        };
      }),
  });
}
