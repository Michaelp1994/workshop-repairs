"use server";

import { signIn } from "@repo/auth";
import { type LoginForm } from "./schema";

export async function login(data: LoginForm) {
  return await signIn("credentials", data);
}
