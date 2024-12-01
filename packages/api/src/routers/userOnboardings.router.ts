import {
  createInvitation,
  createOrganization,
  getOrganizationByInvitationCode,
  getOrganizationByName,
} from "@repo/db/repositories/organization.repository";
import { getUserById } from "@repo/db/repositories/user.repository";
import {
  getUserOnboardingByUserId,
  setInvitations,
  setOrganization,
  updateUserOnboardingByUserId,
} from "@repo/db/repositories/userOnboarding.repository";
import {
  createOrganizationSchema,
  inviteOthersToOrganizationSchema,
  joinOrganizationSchema,
  requestUploadOrganizationLogoSchema,
} from "@repo/validators/server/organization.validators";
import { TRPCError } from "@trpc/server";
import { randomUUID } from "crypto";
import { ZodError } from "zod";

import { createInsertMetadata } from "../helpers/includeMetadata";
import {
  createOrganizationLogoKeyFromFileName,
  createPresignedUrl,
  fileExistsInS3,
  getFileExtension,
} from "../helpers/s3";
import assertDatabaseResult from "../helpers/trpcAssert";
import { authedProcedure, organizationProcedure, router } from "../trpc";

export default router({
  getStatus: authedProcedure.query(async ({ ctx }) => {
    const user = await getUserOnboardingByUserId(ctx.session.userId);
    assertDatabaseResult(user);
    return {
      welcomed: user.onboarding?.welcomed,
      organizationChosen: user.organizationId !== null,
      invitedUsers: user.onboarding?.invitedUsers,
      emailVerified: user.emailVerified,
    };
  }),
  markUserAsWelcomed: authedProcedure.mutation(async ({ ctx }) => {
    const onboarding = await updateUserOnboardingByUserId({
      userId: ctx.session.userId,
      welcomed: true,
    });
    assertDatabaseResult(onboarding);
  }),
  requestUpload: authedProcedure
    .input(requestUploadOrganizationLogoSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await getUserById(ctx.session.userId);
      assertDatabaseResult(user);
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

      const metadata = createInsertMetadata(ctx.session);
      const user = await getUserById(ctx.session.userId);
      assertDatabaseResult(user);

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
            code: "custom",
            path: ["name"],
            message: "This name is already taken.",
          },
        ]);
      }

      const createdOrganization = await createOrganization({
        ...input,
        ...metadata,
      });
      assertDatabaseResult(createdOrganization);

      const updatedUser = await setOrganization(
        ctx.session.userId,
        createdOrganization.id,
      );
      assertDatabaseResult(updatedUser);
      return true;
    }),
  joinOrganization: authedProcedure
    .input(joinOrganizationSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await getUserOnboardingByUserId(ctx.session.userId);
      assertDatabaseResult(user);

      if (user.organizationId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You already belong to an organization",
        });
      }

      const organization = await getOrganizationByInvitationCode(
        input.joinCode,
      );
      if (!organization) {
        throw new ZodError([
          {
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
      assertDatabaseResult(updatedUser);
      await setInvitations(ctx.session.userId);
      return organization;
    }),
  sendInvitations: organizationProcedure
    .input(inviteOthersToOrganizationSchema)
    .mutation(async ({ input, ctx }) => {
      const emails = input.emails.split(/[, \n]/);
      const emailPromises = emails.map((unprocessedEmail) => {
        const email = unprocessedEmail.trim();
        // TODO: Check if valid email.
        console.log({ email });
        return createInvitation({
          email,
          organizationId: ctx.session.organizationId,
          emailSentAt: null,
        });
      });
      await Promise.all(emailPromises);

      const user = await setInvitations(ctx.session.userId);
      assertDatabaseResult(user);
      return true;
    }),
  skipInvitations: organizationProcedure.mutation(async ({ ctx }) => {
    const user = await setInvitations(ctx.session.userId);
    assertDatabaseResult(user);
    return true;
  }),
});
