import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(5, {
    message: "Organization name must be atleast 5 characters.",
  }),
  logo: z.string().min(1, {
    message: "Please upload your logo.",
  }),
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
  logo: "",
};

export const inviteOthersSchema = z.object({
  email: z.string(),
});

export type InviteOthersInput = z.infer<typeof inviteOthersSchema>;

export const defaultInviteOthers: InviteOthersInput = {
  email: "",
};
