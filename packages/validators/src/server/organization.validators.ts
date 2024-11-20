import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(5),
  logo: z.string().min(1),
});

export const getOrganizationByIdSchema = z.object({});

export const inviteOthersToOrganizationSchema = z.object({
  emails: z.string().min(5),
});

export const joinOrganizationSchema = z.object({
  joinCode: z.string(),
});
