import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginForm = z.infer<typeof loginFormSchema>;

export const defaultLogin = {
  email: "michael.poulgrain@gmail.com",
  password: "testpassword",
};
