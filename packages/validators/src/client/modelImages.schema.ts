import { z } from "zod";

import { zFile } from "../helpers/files.schema";
const TEN_MEGABYTES = 10_000_000;
export const modelImageFormSchema = z.object({
  caption: z.string().min(3),
  image: zFile().size(TEN_MEGABYTES).mimeType(["image/png", "image/jpeg"]),
});

export type ModelImageFormInput = z.infer<typeof modelImageFormSchema>;

export const defaultModelImage: ModelImageFormInput = {
  caption: "",
  // url: "",
  image: null as unknown as File,
};
