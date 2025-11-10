import type { $ZodIssue } from "zod/v4/core";

import {
  hashPassword,
  verifyPasswordHash,
  verifyPasswordStrength,
} from "@repo/auth/password";
import { db } from "@repo/db";
import {
  createUser,
  getUserByEmail,
} from "@repo/db/repositories/user.repository";
import { createUserOnboarding } from "@repo/db/repositories/userOnboarding.repository";
import { ZodError } from "zod";

import assertDatabaseResult from "../helpers/assertDatabaseResult";
import sendVerificationEmail from "../helpers/sendVerificationEmail";

interface LogicInput {
  email: string;
  password: string;
}
export async function loginService(input: LogicInput) {
  const user = await getUserByEmail(db, input.email);
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
interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function registerService(input: RegisterInput) {
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
  const emailExists = await getUserByEmail(db, input.email);

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
  const user = await createUser(db, {
    ...input,
    typeId: 1,
    password: hash,
    emailVerified: false,
    organizationId: null,
    createdAt: new Date(),
  });
  assertDatabaseResult(user);

  const onboarding = await createUserOnboarding(db, {
    userId: user.id,
    invitedUsers: false,
    welcomed: false,
    createdAt: new Date(),
  });

  assertDatabaseResult(onboarding);

  await sendVerificationEmail(user.id, user.email);
  return user;
}
