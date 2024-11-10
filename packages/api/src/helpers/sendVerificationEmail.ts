import type { UserID } from "@repo/validators/ids.validators";

import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { generateRandomOTP } from "@repo/auth/generateRandomOTP";
import * as authController from "@repo/db/controllers/auth.controller";
import { Resource } from "sst";

import assertDatabaseResult from "./trpcAssert";

const client = new SESv2Client();

export default async function sendVerificationEmail(
  userId: UserID,
  email: string,
) {
  const code = generateRandomOTP();

  const request = await authController.create({
    userId: userId,
    email: email,
    code: code,
    expiresAt: new Date(Date.now() + 1000 * 60 * 10),
  });

  assertDatabaseResult(request);

  if (process.env["NODE_ENV"] === "production ") {
    await client.send(
      new SendEmailCommand({
        FromEmailAddress: Resource.Email1.sender,
        Destination: {
          ToAddresses: [email],
        },
        Content: {
          Simple: {
            Subject: {
              Data: "Verify your email address",
            },
            Body: {
              Text: {
                Data: `Verification Code: ${code}`,
              },
            },
          },
        },
      }),
    );
  } else {
    console.log(`To ${email}: your code is ${code}`);
  }
}
