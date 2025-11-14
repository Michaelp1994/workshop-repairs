import {
  HeadObjectCommand,
  PutObjectCommand,
  type PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { fromSSO } from "@aws-sdk/credential-providers";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const ONE_MINUTE = 60 * 1000;

const s3 = new S3Client({
  credentials: fromSSO({ profile: "workshop-repairs" }),
  region: "ap-southeast-2",
});

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
    Bucket: process.env["s3BucketName"],
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
    Bucket: process.env["s3BucketName"],
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
      throw new Error("Invalid fileType");
  }
}

export function getModelImageUrlFromKey(key: string) {
  if (!process.env["imageUrl"]) {
    throw new Error("IMAGE_URL not set");
  }
  return `${process.env["imageUrl"]}/modelImages/${key}`;
}

export function getOrganizationLogoUrlFromKey(key: string) {
  return `https://workshop-repairs-dev-assets.s3.ap-southeast-2.amazonaws.com/organizations/logos/${key}`;
}

export function getRepairImageUrlFromKey(key: string) {
  if (!process.env["imageUrl"]) {
    throw new Error("IMAGE_URL not set");
  }
  return `${process.env["imageUrl"]}/repairImages/${key}`;
}
