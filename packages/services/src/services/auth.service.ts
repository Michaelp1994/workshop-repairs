import type EmailVerificationRequestRepository from "@repo/db/repositories/emailVerificationRequest.repository";
import type { $ZodIssue } from "zod/v4/core";

import { generateRandomOTP } from "@repo/auth/generateRandomOTP";
import {
  hashPassword,
  verifyPasswordHash,
  verifyPasswordStrength,
} from "@repo/auth/password";
import { type Database } from "@repo/db";
import UserRepository from "@repo/db/repositories/user.repository";
import UserOnboardingRepository from "@repo/db/repositories/userOnboarding.repository";
import { ZodError } from "zod";

import sendVerificationEmail from "../helpers/sendVerificationEmail";

interface LogicInput {
  email: string;
  password: string;
}
interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default class AuthService {
  constructor(
    private db: Database,
    private userRepository: UserRepository,
    private userOnboardingRepository: UserOnboardingRepository,
    private emailVerificationRequestRepository: EmailVerificationRequestRepository,
  ) {}

  async login(input: LogicInput) {
    const user = await this.userRepository.getByEmail(this.db, input.email);
    if (!user) {
      throw new ZodError([
        {
          input: null,
          code: "custom",
          path: ["root"],
          message: "Login details are not correct.",
        },
      ]);
    }
    const passwordCorrect = await verifyPasswordHash(
      user.password,
      input.password,
    );
    if (!passwordCorrect) {
      throw new ZodError([
        {
          input: null,
          code: "custom",
          path: ["root"],
          message: "Login details are not correct.",
        },
      ]);
    }
    return user;
  }

  async register(input: RegisterInput) {
    const issues: $ZodIssue[] = [];
    const passwordStrongEnough = await verifyPasswordStrength(input.password);

    if (!passwordStrongEnough) {
      issues.push({
        input: null,
        code: "custom",
        path: ["password"],
        message:
          "Your password has been found in a data breach. Please choose a different password",
      });
    }
    const emailExists = await this.userRepository.getByEmail(
      this.db,
      input.email,
    );

    if (emailExists) {
      issues.push({
        input: null,
        code: "custom",
        path: ["email"],
        message: "This email has already been registered with an account",
      });
    }

    if (issues.length > 0) {
      throw new ZodError(issues);
    }

    const hash = await hashPassword(input.password);

    const { user, code } = await this.db.transaction(async (tx) => {
      const user = await this.userRepository.create(tx, {
        ...input,
        password: hash,
        emailVerified: false,
        organizationId: null,
        createdAt: new Date(),
      });

      const onboarding = await this.userOnboardingRepository.create(tx, {
        userId: user.id,
        invitedUsers: false,
        welcomed: false,
        createdAt: new Date(),
        createdById: user.id,
      });

      const code = generateRandomOTP();
      const request = await this.emailVerificationRequestRepository.create(tx, {
        userId: user.id,
        email: user.email,
        code: code,
        expiresAt: new Date(Date.now() + 1000 * 60 * 10),
        createdAt: new Date(),
        createdById: user.id,
      });

      return { user, code };
    });

    await sendVerificationEmail(user.email, code);
    return user;
  }
}
