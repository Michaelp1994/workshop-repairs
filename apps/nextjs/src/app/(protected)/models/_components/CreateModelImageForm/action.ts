"use server";

import type { ModelID } from "@repo/validators/ids.validators";

import { redirect } from "next/navigation";

import { api } from "~/trpc/server";
import { getBaseUrl } from "~/utils/getBaseUrl";

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
