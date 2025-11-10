import type { UserID } from "@repo/validators/ids.validators";

import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { generateRandomOTP } from "@repo/auth/generateRandomOTP";
import { db } from "@repo/db";
import { createEmailVerificationRequest } from "@repo/db/repositories/emailVerificationRequest.repository";

import assertDatabaseResult from "./assertDatabaseResult";

const client = new SESv2Client();

export default async function sendVerificationEmail(
  userId: UserID,
  email: string,
) {
  const code = generateRandomOTP();

  const request = await createEmailVerificationRequest(db, {
    userId: userId,
    email: email,
    code: code,
    expiresAt: new Date(Date.now() + 1000 * 60 * 10),
    createdAt: new Date(),
  });

  assertDatabaseResult(request);
  if (process.env["nodeEnv"] === "production") {
    try {
      await client.send(
        new SendEmailCommand({
          FromEmailAddress: process.env["returnEmail"],
          Destination: {
            ToAddresses: [email],
          },
          Content: {
            Simple: {
              Subject: {
                Data: "Verify your email address - AssetRx",
              },
              Body: {
                Text: {
                  Data: `Your verification code is ${code}. This code will expire in 10 minutes. Please don't share this code with anyone.`,
                },
              },
            },
          },
        }),
      );
    } catch (e) {
      console.error(e);
    }
  } else {
    console.log(`To ${email}: your code is ${code}`);
  }
}
