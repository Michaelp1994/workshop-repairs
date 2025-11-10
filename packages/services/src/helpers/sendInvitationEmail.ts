import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { generateRandomOTP } from "@repo/auth/generateRandomOTP";
import { db } from "@repo/db";
import { createInvitation } from "@repo/db/repositories/organization.repository";

import type { Organization } from "../../../db/src/tables/organization.sql";

const client = new SESv2Client();

export default async function sendInvitationEmail(
  email: string,
  organization: Organization,
) {
  const code = generateRandomOTP();
  if (!organization.invitationCode) {
    throw Error("Organization does not have an invitation code");
  }
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
                Data: "You've been invited!",
              },
              Body: {
                Text: {
                  Data: `You've been invited to join ${organization.name} on AssetRx. Please sign up at https://workshop-repairs.link and use the invitation code: ${organization.invitationCode}.`,
                },
              },
            },
          },
        }),
      );
      await createInvitation(db, {
        email,
        organizationId: organization.id,
        emailSentAt: new Date(),
      });
    } catch (e) {
      console.error(e);
    }
  } else {
    console.log(`To ${email}: your code is ${code}`);
  }
}
