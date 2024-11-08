import { db } from "..";
import {
  type CreateOrganizationInvitation,
  organizationInvitation,
} from "../schemas/organization-invitations";
import {
  type CreateOrganization,
  organizationTable,
} from "../schemas/organization.table";

export async function create(input: CreateOrganization) {
  const query = db.insert(organizationTable).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function createInvitation(input: CreateOrganizationInvitation) {
  const query = db.insert(organizationInvitation).values(input).returning();
  const [res] = await query.execute();
  return res;
}
