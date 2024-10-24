"use server";

import type {
  LoginFormInput,
  RegisterFormInput,
} from "@repo/validators/forms/auth.schema";
import type { ModelID } from "@repo/validators/ids.validators";

import { signIn, signOut } from "@repo/auth";
import { redirect } from "next/navigation";

import { api } from "~/trpc/server";
import { getBaseUrl } from "~/utils/getBaseUrl";

export async function login(data: LoginFormInput) {
  try {
    await signIn("credentials", data);
  } catch (e) {
    console.log(e);
    return { message: "Invalid email or password" };
  } finally {
    redirect("/dashboard");
  }
}

export default async function logout() {
  return await signOut();
}

export async function register(data: RegisterFormInput) {
  await api.users.register(data);
  redirect("/dashboard");
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
