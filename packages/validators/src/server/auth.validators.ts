import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const sessionSchema = z.object({
  token: z.string(),
  onboardingCompleted: z.boolean(),
  emailVerified: z.boolean(),
});

export type Session = z.infer<typeof sessionSchema>;

export const logoutSchema = z.object({});

export const registerSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const confirmEmailSchema = z.object({
  email: z.string().email(),
  code: z.string(),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  otp: z.string(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const changePasswordSchema = z.object({
  newPassword: z.string().min(8),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
});
