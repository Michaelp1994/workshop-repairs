"use server";

import { api } from "~/trpc/react";
import { type RegisterFormInput } from "./schema";

export async function register(data: RegisterFormInput) {
  await api.users.register(data);
}
