import * as organizationsController from "@repo/db/controllers/organization.controller";
import * as usersController from "@repo/db/controllers/users.controller";
import * as organizationsSchemas from "@repo/validators/organization.validators";
import { TRPCError } from "@trpc/server";

import { createMetadata } from "../helpers/includeMetadata";
import { protectedProcedure, router } from "../trpc";

export default router({
  create: protectedProcedure
    .input(organizationsSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);

      // CREATE FILE FROM BLOB:
      console.log(input.logo);
      const createdOrganization = await organizationsController.create({
        ...input,
        ...metadata,
      });

      if (!createdOrganization) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "can't create organization",
        });
      }
      await usersController.setOrganization(
        ctx.session.userId,
        createdOrganization.id,
      );

      return createdOrganization;
    }),
});
