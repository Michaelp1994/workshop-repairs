import type { UserID } from "@repo/validators/ids.validators";

import { type Database } from "@repo/db";
import OrganizationRepository from "@repo/db/repositories/organization.repository";
import OrganizationInvitationRepository from "@repo/db/repositories/organizationInvitation.repository";
import UserRepository from "@repo/db/repositories/user.repository";
import UserOnboardingRepository from "@repo/db/repositories/userOnboarding.repository";
import { randomUUID } from "crypto";
import { ZodError } from "zod";

import {
  type AuthedSession,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import {
  createOrganizationLogoKeyFromFileName,
  createPresignedUrl,
  getFileExtension,
} from "../helpers/s3";
import sendInvitationEmail from "../helpers/sendInvitationEmail";

export default class UserOnboardingService {
  constructor(
    private db: Database,
    private userOnboardingRepository: UserOnboardingRepository,
    private userRepository: UserRepository,
    private organizationRepository: OrganizationRepository,
    private organizationInvitationRepository: OrganizationInvitationRepository,
  ) {}

  async getStatus(userId: UserID) {
    const userStatus = await this.userOnboardingRepository.getByUserId(
      this.db,
      userId,
    );

    return userStatus;
  }

  async joinOrganization(input: { joinCode: string }, session: AuthedSession) {
    const user = await this.userOnboardingRepository.getByUserId(
      this.db,
      session.userId,
    );

    if (user.organizationId) {
      throw new Error("You already belong to an organization");
    }

    const organization = await this.organizationRepository.findByInvitationCode(
      this.db,
      input.joinCode,
    );
    if (!organization) {
      throw new ZodError([
        {
          input: null,
          code: "custom",
          path: ["joinCode"],
          message: "Invalid Join Code, please contact your organization admin.",
        },
      ]);
    }
    const metadata = createUpdateMetadata(session);
    await this.userRepository.update(
      this.db,
      {
        organizationId: organization.id,
        onboardingCompleted: true,
        ...metadata,
      },
      session.userId,
    );

    return organization;
  }

  async markUserAsWelcomed(session: AuthedSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      return this.userOnboardingRepository.updateByUserId(
        tx,
        { welcomed: true, ...metadata },
        session.userId,
      );
    });
  }

  async requestUpload(
    input: { name: string; fileType: string; fileSize: number },
    session: AuthedSession,
  ) {
    const user = await this.userRepository.getById(this.db, session.userId);

    if (user.organizationId) {
      throw new Error("You already belong to an organization");
    }
    const organizationExists = await this.organizationRepository.findByName(
      this.db,
      input.name,
    );

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
  }

  async sendInvitations(
    input: { emails: string },
    session: OrganizationSession,
  ) {
    const emails = input.emails.split(/[, \n]/);
    const organization = await this.organizationRepository.getById(
      this.db,
      session.organizationId,
    );

    const emailPromises = emails.map(async (unprocessedEmail) => {
      const email = unprocessedEmail.trim();
      const metadata = createInsertMetadata(session);
      // TODO: Check if valid email.
      await this.organizationInvitationRepository.createInvitation(this.db, {
        email,
        emailSentAt: new Date(),
        ...metadata,
      });
      return sendInvitationEmail(email, organization);
    });

    await Promise.all(emailPromises);

    await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      await this.userOnboardingRepository.updateByUserId(
        tx,
        {
          invitedUsers: true,
          ...metadata,
        },
        session.userId,
      );

      await this.userRepository.update(
        tx,
        { onboardingCompleted: true, ...metadata },
        session.userId,
      );
    });

    return true;
  }

  async skipInvitations(session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);

      await this.userOnboardingRepository.updateByUserId(
        tx,
        {
          invitedUsers: true,
          ...metadata,
        },
        session.userId,
      );

      await this.userRepository.update(
        tx,
        { onboardingCompleted: true, ...metadata },
        session.userId,
      );
    });
  }
}
