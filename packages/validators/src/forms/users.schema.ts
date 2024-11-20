import { z } from "zod";

import { userTypeId } from "../schemas/ids.validators";

export const userFormSchema = z.object({
  firstName: z.string().min(3, {
    message: "First name must be atleast 3 characters.",
  }),
  lastName: z.string().min(3, {
    message: "Last name must be atleast 3 characters.",
  }),
  typeId: userTypeId,
  email: z.string().email({
    message: "Please enter a valid email",
  }),
});

export type UserFormInput = z.infer<typeof userFormSchema>;
