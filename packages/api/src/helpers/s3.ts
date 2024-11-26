import {
  HeadObjectCommand,
  PutObjectCommand,
  type PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { TRPCError } from "@trpc/server";
import { Resource } from "sst";

const s3 = new S3Client({});
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
    Bucket: Resource.Bucket1.name,
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
    Bucket: Resource.Bucket1.name,
    Key: key,
  });
  const result = await s3.send(command);
  const exists = result.$metadata.httpStatusCode === 200;
  console.log({ exists });
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
  return `${Resource.MyRouter.url}/modelImages/${key}`;
}

export function getOrganizationLogoUrlFromKey(key: string) {
  return `${Resource.MyRouter.url}/organizations/logos/${key}`;
}

export function getRepairImageUrlFromKey(key: string) {
  return `${Resource.MyRouter.url}/repairImages/${key}`;
}
