import type { $ZodIssue } from "zod/v4/core";

import {
  hashPassword,
  verifyPasswordHash,
  verifyPasswordStrength,
} from "@repo/auth/password";
import { type Database } from "@repo/db";
import UserRepository from "@repo/db/repositories/user.repository";
import UserOnboardingRepository from "@repo/db/repositories/userOnboarding.repository";
import { ZodError } from "zod";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
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
    private userRepository: UserRepository = new UserRepository(),
    private userOnboardingRepository: UserOnboardingRepository = new UserOnboardingRepository(),
  ) {}

  async login(input: LogicInput) {
    const user = await this.userRepository.getUserByEmail(this.db, input.email);
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
    const emailExists = await this.userRepository.getUserByEmail(
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
    const user = await this.userRepository.createUser(this.db, {
      ...input,
      typeId: 1,
      password: hash,
      emailVerified: false,
      organizationId: null,
      createdAt: new Date(),
    });
    assertDatabaseResult(user);

    const onboarding = await this.userOnboardingRepository.createUserOnboarding(
      this.db,
      {
        userId: user.id,
        invitedUsers: false,
        welcomed: false,
        createdAt: new Date(),
      },
    );

    assertDatabaseResult(onboarding);

    await sendVerificationEmail(user.id, user.email);
    return user;
  }
}
