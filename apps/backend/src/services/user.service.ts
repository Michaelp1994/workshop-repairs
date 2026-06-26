import { generateRandomOTP } from "@repo/auth/generateRandomOTP";

import type { UserInput } from "../tables/user.table";
import type {
  CountInput,
  CreateInput,
  GetAllInput,
  UpdateInput,
} from "./types";
import type { UserID } from "../validators/ids.validators";

import { type Database } from "../db";
import {
  type AuthedSession,
  createArchiveMetadata,
  createInsertMetadata,
  createUpdateMetadata,
  type OrganizationSession,
} from "../helpers/includeMetadata";
import sendVerificationEmail from "../helpers/sendVerificationEmail";
import EmailVerificationRequestRepository from "../repositories/emailVerificationRequest.repository";
import UserRepository from "../repositories/user.repository";

export default class UserService {
  constructor(
    private db: Database,
    private userRepository: UserRepository,
    private emailVerificationRequestRepository: EmailVerificationRequestRepository,
  ) {}

  async archiveUser(id: UserID, session: OrganizationSession) {
    return await this.db.transaction(async (tx) => {
      const metadata = createArchiveMetadata(session);
      return this.userRepository.archive(tx, metadata, id);
    });
  }
  async confirmEmail(
    input: {
      email: string;
      code: string;
    },
    session: AuthedSession,
  ) {
    const user = await this.userRepository.findByEmail(this.db, input.email);

    if (!user) {
      throw new Error("User not found");
    }

    const request =
      await this.emailVerificationRequestRepository.getByEmailAndCode(
        this.db,
        input.email,
        input.code,
      );

    await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = {
        ...metadata,
        emailVerified: true,
      };
      await this.userRepository.update(tx, values, user.id);
      await this.emailVerificationRequestRepository.archive(
        this.db,
        request.id,
      );
    });

    return true;
  }

  async countUsers(input: CountInput, session: OrganizationSession) {
    return this.userRepository.count(this.db, input, session.organizationId);
  }

  async createUser(
    input: CreateInput<UserInput>,
    session: OrganizationSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createInsertMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      return this.userRepository.create(tx, values);
    });
  }

  async getAllUsers(input: GetAllInput, session: OrganizationSession) {
    return this.userRepository.getAll(this.db, input, session.organizationId);
  }

  async getCredentialsByUserId(id: UserID) {
    return await this.userRepository.getSimpleById(this.db, id);
  }

  async getUserById(id: UserID) {
    return this.userRepository.getById(this.db, id);
  }

  async sendEmailConfirmation(session: AuthedSession) {
    const user = await this.userRepository.getById(this.db, session.userId);
    const code = generateRandomOTP();
    await sendVerificationEmail(user.email, code);
  }

  async updateUser(
    input: UpdateInput<UserInput>,
    id: UserID,
    session: AuthedSession,
  ) {
    return await this.db.transaction(async (tx) => {
      const metadata = createUpdateMetadata(session);
      const values = {
        ...input,
        ...metadata,
      };
      return this.userRepository.update(tx, values, id);
    });
  }
}
