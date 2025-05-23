import { getOrganizationById } from "@repo/db/repositories/organization.repository";
import { getOrganizationByIdSchema } from "@repo/validators/server/organization.validators";

import { getOrganizationLogoUrlFromKey } from "../helpers/s3";
import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  get: organizationProcedure
    .input(getOrganizationByIdSchema)
    .query(async ({ ctx }) => {
      const organization = await getOrganizationById(
        ctx.session.organizationId,
      );
      assertDatabaseResult(organization);
      return {
        ...organization,
        logo: organization.logo
          ? getOrganizationLogoUrlFromKey(organization.logo)
          : null,
      };
    }),
});
