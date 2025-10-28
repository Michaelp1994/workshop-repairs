import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const logoutSchema = z.object({});

export const registerSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
});

export const confirmEmailSchema = z.object({
  email: z.email(),
  code: z.string(),
});

export const resetPasswordSchema = z.object({
  email: z.email(),
  otp: z.string(),
});

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export const changePasswordSchema = z.object({
  newPassword: z.string().min(8),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.email(),
});
