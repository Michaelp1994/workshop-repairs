import UserOnboardingService from "@repo/services/services/userOnboarding.service";
import {
  createOrganizationSchema,
  inviteOthersToOrganizationSchema,
  joinOrganizationSchema,
  requestUploadOrganizationLogoSchema,
} from "@repo/validators/server/organization.validators";

import { authedProcedure, organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default function Router(userOnboardingService: UserOnboardingService) {
  return router({
    getStatus: authedProcedure.query(async ({ ctx }) => {
      const user = await userOnboardingService.getStatus(ctx.session.userId);

      return {
        welcomed: user.onboarding?.welcomed,
        organizationChosen: user.organizationId !== null,
        invitedUsers: user.onboarding?.invitedUsers,
        emailVerified: user.emailVerified,
      };
    }),
    markUserAsWelcomed: authedProcedure.mutation(async ({ ctx }) => {
      const onboarding = await userOnboardingService.markUserAsWelcomed(
        ctx.session,
      );
      return onboarding;
    }),
    requestUpload: authedProcedure
      .input(requestUploadOrganizationLogoSchema)
      .mutation(async ({ input, ctx }) => {
        return await userOnboardingService.requestUpload(input, ctx.session);
      }),
    createOrganization: authedProcedure
      .input(createOrganizationSchema)
      .mutation(async ({ input, ctx }) => {
        return await userOnboardingService.createOrganization(
          input,
          ctx.session,
        );
      }),
    joinOrganization: authedProcedure
      .input(joinOrganizationSchema)
      .mutation(async ({ input, ctx }) => {
        return await userOnboardingService.joinOrganization(input, ctx.session);
      }),
    sendInvitations: organizationProcedure
      .input(inviteOthersToOrganizationSchema)
      .mutation(async ({ input, ctx }) => {
        return await userOnboardingService.sendInvitations(input, ctx.session);
      }),
    skipInvitations: organizationProcedure.mutation(async ({ ctx }) => {
      await userOnboardingService.skipInvitations(ctx.session);

      return true;
    }),
  });
}
