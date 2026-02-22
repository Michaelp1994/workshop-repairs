import { and, eq } from "drizzle-orm";

import type { CreateInput } from "../types";

import { type DatabaseTransaction } from "..";
import { returnOne } from "../helpers/executeQuery";
import {
  type EmailVerificationRequestID,
  type EmailVerificationRequestInput,
  emailVerificationRequestTable,
} from "../tables/emailVerificationRequest.table";

export default class EmailVerificationRequestRepository {
  async archive(tx: DatabaseTransaction, id: EmailVerificationRequestID) {
    const query = tx
      .delete(emailVerificationRequestTable)
      .where(and(eq(emailVerificationRequestTable.id, id)))
      .returning();
    return await returnOne(query);
  }

  async create(
    tx: DatabaseTransaction,
    input: CreateInput<EmailVerificationRequestInput>,
  ) {
    const query = tx
      .insert(emailVerificationRequestTable)
      .values(input)
      .returning();
    return await returnOne(query);
  }

  async getByEmailAndCode(
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
    return await returnOne(query);
  }
}
