import { and, eq } from "drizzle-orm";

import { db } from "..";
import {
  type CreateEmailVerificationRequest,
  type EmailVerificationRequestID,
  emailVerificationRequestTable,
} from "../tables/email-verification-request.sql";

export async function create(input: CreateEmailVerificationRequest) {
  const query = db
    .insert(emailVerificationRequestTable)
    .values(input)
    .returning();
  const [res] = await query.execute();
  return res;
}

export async function getByEmail(email: string, code: string) {
  const query = db
    .select()
    .from(emailVerificationRequestTable)
    .where(
      and(
        eq(emailVerificationRequestTable.email, email),
        eq(emailVerificationRequestTable.code, code),
      ),
    );
  const [res] = await query.execute();
  return res;
}

export async function deleteConfirmationRequest(
  id: EmailVerificationRequestID,
) {
  const query = db
    .delete(emailVerificationRequestTable)
    .where(and(eq(emailVerificationRequestTable.id, id)))
    .returning();
  const [res] = await query.execute();
  return res;
}
