import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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
} from "@repo/validators/organization.validators";
import { TRPCError } from "@trpc/server";
import { Resource } from "sst";
import { ZodError } from "zod";

import createSession from "../helpers/createSession";
import { createInsertMetadata } from "../helpers/includeMetadata";
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
  createOrganization: authedProcedure
    .input(createOrganizationSchema)
    .mutation(async ({ input, ctx }) => {
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

      const fileType = input.logo.split(".").pop();
      const fileName = `organizations/logos/logo-${createdOrganization.id}.${fileType}`;
      const command = new PutObjectCommand({
        Key: fileName,
        Bucket: Resource.Bucket1.name,
      });
      const url = await getSignedUrl(new S3Client({}), command);
      const session = await createSession(updatedUser);

      return { url, ...session };
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

      const session = await createSession(updatedUser);
      return {
        ...session,
        organization,
      };
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
      const session = await createSession(user);
      return session;
    }),
  skipInvitations: organizationProcedure.mutation(async ({ ctx }) => {
    const user = await setInvitations(ctx.session.userId);
    assertDatabaseResult(user);
    const session = await createSession(user);
    return session;
  }),
});
