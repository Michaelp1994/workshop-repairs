import { and, eq } from "drizzle-orm";

import type { CreateInput } from "../types";

import { type DatabaseTransaction } from "..";
import {
  type EmailVerificationRequestID,
  type EmailVerificationRequestInput,
  emailVerificationRequestTable,
} from "../tables/email-verification-request.sql";

export default class EmailVerificationRequestRepository {
  async createEmailVerificationRequest(
    tx: DatabaseTransaction,
    input: CreateInput<EmailVerificationRequestInput>,
  ) {
    const query = tx
      .insert(emailVerificationRequestTable)
      .values(input)
      .returning();
    const [res] = await query.execute();
    return res;
  }

  async deleteEmailConfirmationRequestById(
    tx: DatabaseTransaction,
    id: EmailVerificationRequestID,
  ) {
    const query = tx
      .delete(emailVerificationRequestTable)
      .where(and(eq(emailVerificationRequestTable.id, id)))
      .returning();
    const [res] = await query.execute();
    return res;
  }

  async getEmailVerificationRequest(
    tx: DatabaseTransaction,
    email: string,
    code: string,
  ) {
    const query = tx
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
}
