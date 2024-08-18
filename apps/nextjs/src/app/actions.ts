"use server";

import type {
  LoginFormInput,
  RegisterFormInput,
} from "@repo/validators/forms/auth.schema";
import type { ModelID } from "@repo/validators/ids.validators";

import { signIn } from "@repo/auth";
import { signOut } from "@repo/auth";
import { redirect } from "next/navigation";

import { api } from "~/trpc/server";
import { getBaseUrl } from "~/utils/getBaseUrl";

export async function login(data: LoginFormInput) {
  try {
    await signIn("credentials", data);
    redirect("/dashboard");
  } catch (e) {
    console.log(e);
    return { message: "Invalid email or password" };
  }
}

export default async function logout() {
  return await signOut();
}

export async function register(data: RegisterFormInput) {
  await api.users.register(data);
}

export async function uploadModelImage(modelId: ModelID, formData: FormData) {
  const image = formData.get("image") as File;
  const caption = formData.get("caption") as string;
  const result = await api.modelImages.uploadImage({
    image,
    caption,
    modelId,
  });

  redirect(`${getBaseUrl()}/models/${modelId}`);
}
