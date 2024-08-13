import { and, desc, eq, gte } from "drizzle-orm";

import type { Database } from "..";
import type { UserID } from "../schemas/users.schema";

import { usersOtp } from "../schemas/users-otp.schema";

interface CreateOTP {
  userId: UserID;
  otp: string;
  createdAt: Date;
}

export async function create(input: CreateOTP, db: Database) {
  const query = db.insert(usersOtp).values(input).returning();
  const [res] = await query.execute();
  return res;
}

function tenMinutesAgo() {
  const now = new Date();
  return new Date(now.getTime() - 10 * 60 * 1000);
}

export async function getById(userId: UserID, db: Database) {
  const query = db
    .select()
    .from(usersOtp)
    .where(
      and(
        eq(usersOtp.userId, userId),
        gte(usersOtp.createdAt, tenMinutesAgo()),
      ),
    )
    .orderBy(desc(usersOtp.createdAt))
    .limit(1);
  const [res] = await query.execute();
  return res;
}
