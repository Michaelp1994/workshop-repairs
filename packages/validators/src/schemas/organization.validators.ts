import { z } from "zod";

export const create = z.object({
  name: z.string().min(5),
  logo: z.string().min(1),
});

export const inviteOthers = z.object({
  emails: z.string().min(5),
});
