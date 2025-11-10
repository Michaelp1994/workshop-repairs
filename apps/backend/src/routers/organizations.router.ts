import { getOrganizationService } from "@repo/services/services/organization.service";
import { getOrganizationByIdSchema } from "@repo/validators/server/organization.validators";

import { getOrganizationLogoUrlFromKey } from "../helpers/s3";
import { organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  get: organizationProcedure
    .input(getOrganizationByIdSchema)
    .query(async ({ ctx }) => {
      const organization = await getOrganizationService(
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
