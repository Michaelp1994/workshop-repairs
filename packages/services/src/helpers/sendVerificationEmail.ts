import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";

const client = new SESv2Client();

export default async function sendVerificationEmail(
  email: string,
  code: string,
) {
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
