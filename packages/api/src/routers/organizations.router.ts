import * as organizationsController from "@repo/db/controllers/organization.controller";
import * as organizationsSchemas from "@repo/validators/organization.validators";

import assertDatabaseResult from "../helpers/trpcAssert";
import { organizationProcedure, router } from "../trpc";

export default router({
  get: organizationProcedure
    .input(organizationsSchemas.getById)
    .query(async ({ ctx }) => {
      const organization = await organizationsController.getById(
        ctx.session.organizationId,
      );
      assertDatabaseResult(organization);
      return organization;
    }),
});
