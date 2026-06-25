import type { $ZodIssue } from "zod/v4/core";

import { generateRandomOTP } from "@repo/auth/generateRandomOTP";
import {
  hashPassword,
  verifyPasswordHash,
  verifyPasswordStrength,
} from "@repo/auth/password";
import { ZodError } from "zod";

import type EmailVerificationRequestRepository from "../repositories/emailVerificationRequest.repository";

import { type Database } from "../db";
import sendVerificationEmail from "../helpers/sendVerificationEmail";
import UserRepository from "../repositories/user.repository";
import UserOnboardingRepository from "../repositories/userOnboarding.repository";

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
    const user = await this.userRepository.findByEmail(this.db, input.email);
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
    const emailExists = await this.userRepository.findByEmail(
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
        createdById: null,
      });

      await this.userOnboardingRepository.create(tx, {
        userId: user.id,
        invitedUsers: false,
        welcomed: false,
        createdAt: new Date(),
        createdById: user.id,
      });

      const code = generateRandomOTP();

      await this.emailVerificationRequestRepository.create(tx, {
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
