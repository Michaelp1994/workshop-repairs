import { z } from "zod";

export const userFormSchema = z.object({
  firstName: z.string().min(3, {
    message: "First name must be atleast 3 characters.",
  }),
  lastName: z.string().min(3, {
    message: "Last name must be atleast 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters.",
  }),
  acceptToS: z.literal<boolean>(true, {
    errorMap: () => ({
      message: "Please accept the Terms and Services.",
    }),
  }),
});

export type UserFormInput = z.infer<typeof userFormSchema>;
