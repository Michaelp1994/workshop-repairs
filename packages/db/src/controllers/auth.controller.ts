import { and, eq } from "drizzle-orm";

import { db } from "..";
import {
  type CreateEmailVerificationRequest,
  type EmailVerificationRequestID,
  emailVerificationRequests,
} from "../schemas/email-verification-requests.schema";

export async function create(input: CreateEmailVerificationRequest) {
  const query = db.insert(emailVerificationRequests).values(input).returning();
  const [res] = await query.execute();
  return res;
}

export async function getByEmail(email: string, code: string) {
  const query = db
    .select()
    .from(emailVerificationRequests)
    .where(
      and(
        eq(emailVerificationRequests.email, email),
        eq(emailVerificationRequests.code, code),
      ),
    );
  const [res] = await query.execute();
  return res;
}

export async function deleteConfirmationRequest(
  id: EmailVerificationRequestID,
) {
  const query = db
    .delete(emailVerificationRequests)
    .where(and(eq(emailVerificationRequests.id, id)))
    .returning();
  const [res] = await query.execute();
  return res;
}
