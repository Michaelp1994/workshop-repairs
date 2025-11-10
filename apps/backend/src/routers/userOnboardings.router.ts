import {
  createOrganizationService,
  getStatusService,
  joinOrganizationService,
  markUserAsWelcomedService,
  sendInvitationsService,
  skipInvitationsService,
} from "@repo/services/services/userOnboarding.service";
import {
  createOrganizationSchema,
  inviteOthersToOrganizationSchema,
  joinOrganizationSchema,
  requestUploadOrganizationLogoSchema,
} from "@repo/validators/server/organization.validators";
import { TRPCError } from "@trpc/server";
import { randomUUID } from "crypto";
import { ZodError } from "zod";

import {
  createOrganizationLogoKeyFromFileName,
  createPresignedUrl,
  fileExistsInS3,
  getFileExtension,
} from "../helpers/s3";
import sendInvitationEmail from "../../../../packages/services/src/helpers/sendInvitationEmail";
import { authedProcedure, organizationProcedure } from "../procedures";
import { router } from "../trpc";

export default router({
  getStatus: authedProcedure.query(async ({ ctx }) => {
    const user = await getStatusService(ctx.session.userId);

    return {
      welcomed: user.onboarding?.welcomed,
      organizationChosen: user.organizationId !== null,
      invitedUsers: user.onboarding?.invitedUsers,
      emailVerified: user.emailVerified,
    };
  }),
  markUserAsWelcomed: authedProcedure.mutation(async ({ ctx }) => {
    const onboarding = await markUserAsWelcomedService(ctx.session.userId);
  }),
  requestUpload: authedProcedure
    .input(requestUploadOrganizationLogoSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await getUserById(ctx.session.userId);

      if (user.organizationId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You already belong to an organization",
        });
      }
      const organizationExists = await getOrganizationByName(input.name);

      if (organizationExists) {
        throw new ZodError([
          {
            input: null,
            code: "custom",
            path: ["name"],
            message: "This name is already taken.",
          },
        ]);
      }
      const uuid = randomUUID();
      const fileExt = getFileExtension(input.fileType);
      const fileName = `${uuid}.${fileExt}`;
      const presignedUrl = await createPresignedUrl({
        Key: createOrganizationLogoKeyFromFileName(fileName),
      });
      return { url: presignedUrl, fileName };
    }),
  createOrganization: authedProcedure
    .input(createOrganizationSchema)
    .mutation(async ({ input, ctx }) => {
      const fileExists = await fileExistsInS3(
        createOrganizationLogoKeyFromFileName(input.logo),
      );
      if (!fileExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "File does not exist.",
        });
      }

      const user = await getUserById(ctx.session.userId);

      if (user.organizationId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You already belong to an organization",
        });
      }

      const organizationExists = await getOrganizationByName(input.name);

      if (organizationExists) {
        throw new ZodError([
          {
            input: null,
            code: "custom",
            path: ["name"],
            message: "This name is already taken.",
          },
        ]);
      }

      const createdOrganization = await createOrganization(input);

      const updatedUser = await setOrganization(
        ctx.session.userId,
        createdOrganization.id,
      );

      return true;
    }),
  joinOrganization: authedProcedure
    .input(joinOrganizationSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await getUserOnboardingByUserId(ctx.session.userId);

      if (user.organizationId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You already belong to an organization",
        });
      }

      const organization = await joinOrganizationService(input.joinCode);
      if (!organization) {
        throw new ZodError([
          {
            input: null,
            code: "custom",
            path: ["joinCode"],
            message:
              "Invalid Join Code, please contact your organization admin.",
          },
        ]);
      }

      const updatedUser = await setOrganization(
        ctx.session.userId,
        organization.id,
      );

      await sendInvitationsService(ctx.session.userId);
      return organization;
    }),
  sendInvitations: organizationProcedure
    .input(inviteOthersToOrganizationSchema)
    .mutation(async ({ input, ctx }) => {
      const emails = input.emails.split(/[, \n]/);
      const organization = await getOrganizationById(
        ctx.session.organizationId,
      );

      const emailPromises = emails.map((unprocessedEmail) => {
        const email = unprocessedEmail.trim();
        // TODO: Check if valid email.
        return sendInvitationEmail(email, organization);
      });

      await Promise.all(emailPromises);

      const user = await sendInvitationsService(ctx.session.userId);

      return true;
    }),
  skipInvitations: organizationProcedure.mutation(async ({ ctx }) => {
    const user = await skipInvitationsService(ctx.session.userId);

    return true;
  }),
});
