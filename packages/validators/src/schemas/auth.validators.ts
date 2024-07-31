import { z } from "zod";

export const OTP_LENGTH = 6;

const authSchemas = {
  login: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  register: z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  }),
  resetPassword: z.object({
    email: z.string().email(),
    otp: z.string().length(OTP_LENGTH),
  }),
  forgotPassword: z.object({
    email: z.string().email(),
  }),
  changePassword: z.object({
    newPassword: z.string().min(8),
  }),
  updateProfile: z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
  }),
};

export default authSchemas;
