import { z } from "zod";

export const OTP_LENGTH = 6;

export const login = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const register = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const resetPassword = z.object({
  email: z.string().email(),
  otp: z.string().length(OTP_LENGTH),
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
