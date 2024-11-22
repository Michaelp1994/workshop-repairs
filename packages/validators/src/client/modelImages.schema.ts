import { z } from "zod";

export const modelImageFormSchema = z.object({
  caption: z.string().min(3),
  // url: z.string().min(3),
  image: z.instanceof(File),
});

export type ModelImageFormInput = z.infer<typeof modelImageFormSchema>;

export const defaultModelImage: ModelImageFormInput = {
  caption: "",
  // url: "",
  image: null as unknown as File,
};
