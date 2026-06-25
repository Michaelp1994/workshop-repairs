import { z } from "zod";

const TEN_MEGABYTES = 10_000_000;
export const modelImageFormSchema = z.object({
  caption: z.string().min(3),
  image: z.file().max(TEN_MEGABYTES), //.type(["image/png", "image/jpeg"]),
});

export type ModelImageFormInput = z.infer<typeof modelImageFormSchema>;

export const defaultModelImage: ModelImageFormInput = {
  caption: "",
  // url: "",
  image: null as unknown as File,
};
