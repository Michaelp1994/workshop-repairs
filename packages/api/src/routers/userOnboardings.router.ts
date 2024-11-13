import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as organizationsController from "@repo/db/controllers/organization.controller";
import * as userOnboardingsController from "@repo/db/controllers/userOnboardings.controller";
import * as usersController from "@repo/db/controllers/users.controller";
import * as organizationsSchemas from "@repo/validators/organization.validators";
import { TRPCError } from "@trpc/server";
import { Resource } from "sst";
import { ZodError } from "zod";

import createSession from "../helpers/createSession";
import { createMetadata } from "../helpers/includeMetadata";
import assertDatabaseResult from "../helpers/trpcAssert";
import { authedProcedure, organizationProcedure, router } from "../trpc";

export default router({
  getStatus: authedProcedure.query(async ({ ctx }) => {
    const user = await userOnboardingsController.getByUserId(
      ctx.session.userId,
    );
    assertDatabaseResult(user);
    return {
      welcomed: user.onboarding?.welcomed,
      organizationChosen: user.organizationId !== null,
      invitedUsers: user.onboarding?.invitedUsers,
      emailVerified: user.emailVerified,
    };
  }),
  markUserAsWelcomed: authedProcedure.mutation(async ({ ctx }) => {
    const onboarding = await userOnboardingsController.updateByUserId({
      userId: ctx.session.userId,
      welcomed: true,
    });
    assertDatabaseResult(onboarding);
  }),
  createOrganization: authedProcedure
    .input(organizationsSchemas.create)
    .mutation(async ({ input, ctx }) => {
      const metadata = createMetadata(ctx.session);
      const user = await usersController.getById(ctx.session.userId);
      assertDatabaseResult(user);

      if (user.organizationId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You already belong to an organization",
        });
      }

      const organizationExists = await organizationsController.getByName(
        input.name,
      );

      if (organizationExists) {
        throw new ZodError([
          {
            code: "custom",
            path: ["name"],
            message: "This name is already taken.",
          },
        ]);
      }

      const createdOrganization = await organizationsController.create({
        ...input,
        ...metadata,
      });
      assertDatabaseResult(createdOrganization);

      const updatedUser = await userOnboardingsController.setOrganization(
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
    .input(organizationsSchemas.join)
    .mutation(async ({ input, ctx }) => {
      const user = await userOnboardingsController.getByUserId(
        ctx.session.userId,
      );
      assertDatabaseResult(user);

      if (user.organizationId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You already belong to an organization",
        });
      }

      const organization = await organizationsController.getByInvitationCode(
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

      const updatedUser = await userOnboardingsController.setOrganization(
        ctx.session.userId,
        organization.id,
      );
      assertDatabaseResult(updatedUser);

      await userOnboardingsController.setInvitations(ctx.session.userId);

      const session = await createSession(updatedUser);
      return {
        ...session,
        organization,
      };
    }),
  sendInvitations: organizationProcedure
    .input(organizationsSchemas.inviteOthers)
    .mutation(async ({ input, ctx }) => {
      const emails = input.emails.split(/[, \n]/);
      const emailPromises = emails.map((unprocessedEmail) => {
        const email = unprocessedEmail.trim();
        // TODO: Check if valid email.
        console.log({ email });
        return organizationsController.createInvitation({
          email,
          organizationId: ctx.session.organizationId,
          emailSentAt: null,
        });
      });
      await Promise.all(emailPromises);

      const user = await userOnboardingsController.setInvitations(
        ctx.session.userId,
      );
      assertDatabaseResult(user);
      const session = await createSession(user);
      return session;
    }),
  skipInvitations: organizationProcedure.mutation(async ({ ctx }) => {
    const user = await userOnboardingsController.setInvitations(
      ctx.session.userId,
    );
    assertDatabaseResult(user);
    const session = await createSession(user);
    return session;
  }),
});
