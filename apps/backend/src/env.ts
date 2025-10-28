import z from "zod";

const envSchema = z.object({
  IMAGE_URL: z.url(),
  S3_BUCKET_NAME: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  RETURN_EMAIL: z.email(),
});

const envPure = envSchema.parse(process.env);

export const env = {
  imageUrl: envPure.IMAGE_URL,
  s3BucketName: envPure.S3_BUCKET_NAME,
  nodeEnv: envPure.NODE_ENV,
  returnEmail: envPure.RETURN_EMAIL,
};
