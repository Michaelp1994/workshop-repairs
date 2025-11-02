import {
  HeadObjectCommand,
  PutObjectCommand,
  type PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { fromSSO } from "@aws-sdk/credential-providers"; // ES6 import
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { TRPCError } from "@trpc/server";

import { env } from "../env";

const s3 = new S3Client({
  credentials: fromSSO({ profile: "workshop-repairs" }),
  region: "ap-southeast-2",
});

const ONE_MINUTE = 60 * 1000;
export function createModelImageKeyFromFileName(fileName: string) {
  return `modelImages/${fileName}`;
}

export function createOrganizationLogoKeyFromFileName(fileName: string) {
  return `organizations/logos/${fileName}`;
}

export async function createPresignedUrl(
  opts: Omit<PutObjectCommandInput, "Bucket">,
) {
  const command = new PutObjectCommand({
    ...opts,
    Bucket: env.s3BucketName,
  });
  return await getSignedUrl(s3, command, {
    expiresIn: ONE_MINUTE,
  });
}

export function createRepairImageKeyFromFileName(fileName: string) {
  return `repairImages/${fileName}`;
}

export async function fileExistsInS3(key: string) {
  const command = new HeadObjectCommand({
    Bucket: env.s3BucketName,
    Key: key,
  });
  const result = await s3.send(command);
  const exists = result.$metadata.httpStatusCode === 200;
  return exists;
}

export function getFileExtension(fileType: string) {
  switch (fileType) {
    case "image/avif":
      return "avif";
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      console.log({ fileType });
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid fileType",
      });
  }
}

export function getModelImageUrlFromKey(key: string) {
  return `${env.imageUrl}/modelImages/${key}`;
}

export function getOrganizationLogoUrlFromKey(key: string) {
  return `https://workshop-repairs-dev-assets.s3.ap-southeast-2.amazonaws.com/organizations/logos/${key}`;
}

export function getRepairImageUrlFromKey(key: string) {
  return `${env.imageUrl}/repairImages/${key}`;
}
