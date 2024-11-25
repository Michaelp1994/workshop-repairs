import { z } from "zod";

import { zFile } from "../helpers/files.schema";
const TEN_MEGABYTES = 10_000_000;
export const createOrganizationSchema = z.object({
  name: z.string().min(5, {
    message: "Organization name must be atleast 5 characters.",
  }),
  logo: zFile().size(TEN_MEGABYTES).mimeType(["image/png", "image/jpeg"]),
});

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;

export const joinOrganizationSchema = z.object({
  joinCode: z.string().uuid({
    message: "Invalid join code, please check and try again.",
  }),
});

export type JoinOrganizationInput = z.infer<typeof joinOrganizationSchema>;

export const defaultJoinOrganization: JoinOrganizationInput = {
  joinCode: "",
};

export const defaultOrganization: CreateOrganizationInput = {
  name: "",
  logo: null as unknown as File,
};

export const inviteOthersSchema = z.object({
  email: z.string(),
});

export type InviteOthersInput = z.infer<typeof inviteOthersSchema>;

export const defaultInviteOthers: InviteOthersInput = {
  email: "",
};
