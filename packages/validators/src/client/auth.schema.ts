import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginFormInput = z.infer<typeof loginFormSchema>;

export const defaultLogin: LoginFormInput = {
  email: "",
  password: "",
};

export const registerFormSchema = z.object({
  firstName: z.string().min(3, {
    message: "Your first name must be atleast 3 characters.",
  }),
  lastName: z.string().min(3, {
    message: "Your last name must be atleast 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(8, {
    message: "Your password must be atleast 8 characters.",
  }),
  acceptToS: z.literal<boolean>(true, {
    error: "Please accept the Terms and Services.",
  }),
});

export type RegisterFormInput = z.infer<typeof registerFormSchema>;

export const defaultRegister: RegisterFormInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  acceptToS: false,
};

export const confirmFormSchema = z.object({
  otp: z.string(),
});

export type ConfirmFormInput = z.infer<typeof confirmFormSchema>;

export const defaultConfirm = {
  otp: "",
};

export const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordFormInput = z.infer<typeof forgotPasswordFormSchema>;

export const defaultForgotPassword: ForgotPasswordFormInput = {
  email: "",
};

export const resetPasswordFormSchema = z.object({
  otp: z.string().length(6),
});

export type ResetPasswordFormInput = z.infer<typeof resetPasswordFormSchema>;

export const defaultResetPassword: ResetPasswordFormInput = {
  otp: "",
};

export const changePasswordFormSchema = z
  .object({
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormInput = z.infer<typeof changePasswordFormSchema>;

export const defaultChangePassword: ChangePasswordFormInput = {
  newPassword: "",
  confirmPassword: "",
};

export const updateProfileFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export type UpdateProfileFormInput = z.infer<typeof updateProfileFormSchema>;

export const defaultProfile: UpdateProfileFormInput = {
  firstName: "",
  lastName: "",
  email: "",
};

export const verifyAuthUserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  authToken: z.string(),
});

export type AuthUser = z.infer<typeof verifyAuthUserSchema>;
