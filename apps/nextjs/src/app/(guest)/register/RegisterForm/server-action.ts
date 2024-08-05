"use server";

import { api } from "~/trpc/server";

import { type RegisterFormInput } from "./schema";

export async function register(data: RegisterFormInput) {
  await api.users.register(data);
}
