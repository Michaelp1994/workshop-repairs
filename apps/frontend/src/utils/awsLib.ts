import { S3Client } from "@aws-sdk/client-s3";

export const client = new S3Client({});

export async function uploadImageToS3(file: File, url: string) {
  await fetch(url, {
    method: "PUT",
    body: file,
  });
}
