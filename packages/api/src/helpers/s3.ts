import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

if (
  !process.env["AWS_ACCESS_KEY_ID"] ||
  !process.env["AWS_SECRET_ACCESS_KEY"]
) {
  throw new Error("AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set");
}

if (!process.env["AWS_REGION"]) {
  throw new Error("AWS_REGION must be set");
}

if (!process.env["AMPLIFY_BUCKET"]) {
  throw new Error("AMPLIFY_BUCKET must be set");
}

const Bucket = process.env["AMPLIFY_BUCKET"];

export const s3 = new S3Client({
  region: process.env["AWS_REGION"],
  credentials: {
    accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
    secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"],
  },
});

const url = `https://${Bucket}.s3.amazonaws.com/`;

export async function uploadImageS3(image: File) {
  const Body = (await image.arrayBuffer()) as Buffer;
  const command = new PutObjectCommand({
    Bucket,
    Key: image.name,
    Body,
    ContentType: image.type,
  });
  await s3.send(command);
  return { url: url + image.name };
}
