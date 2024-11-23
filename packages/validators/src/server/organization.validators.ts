import { z } from "zod";

import {
  dataTableCountSchema,
  dataTableSchema,
} from "../isomorphic/dataTables.validators";

const organizationFilters = z.object({}).optional();

export const getAllOrganizationsSchema = dataTableSchema.extend({
  filters: organizationFilters,
});
export type GetAllOrganizationsInput = z.infer<
  typeof getAllOrganizationsSchema
>;

export const countOrganizationsSchema = dataTableCountSchema.extend({
  filters: organizationFilters,
});
export type CountOrganizationsInput = z.infer<typeof countOrganizationsSchema>;

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
