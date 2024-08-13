import { z } from "zod";

export const registerFormSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export type RegisterFormInput = z.infer<typeof registerFormSchema>;

export const defaultRegister: RegisterFormInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
