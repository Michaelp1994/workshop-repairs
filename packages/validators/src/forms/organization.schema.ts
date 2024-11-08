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
