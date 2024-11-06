import { db } from "..";
import {
  type CreateOrganization,
  organizations,
} from "../schemas/organization.schema";

export async function create(input: CreateOrganization) {
  const query = db.insert(organizations).values(input).returning();
  const [res] = await query.execute();
  return res;
}
