import { z } from "zod";

export const login = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const session = z.object({
  token: z.string(),
  onboardingCompleted: z.boolean(),
  emailVerified: z.boolean(),
});

export type Session = z.infer<typeof session>;

export const logout = z.object({});

export const register = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const confirmEmail = z.object({
  email: z.string().email(),
  code: z.string(),
});

export const resetPassword = z.object({
  email: z.string().email(),
  otp: z.string(),
});

export const forgotPassword = z.object({
  email: z.string().email(),
});

export const changePassword = z.object({
  newPassword: z.string().min(8),
});

export const updateProfile = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
});
