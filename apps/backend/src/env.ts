import z from "zod";

const envSchema = z.object({
  IMAGE_URL: z.url(),
  S3_BUCKET_NAME: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  RETURN_EMAIL: z.email(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
});

const envPure = envSchema.parse(process.env);

export const env = {
  imageUrl: envPure.IMAGE_URL,
  s3BucketName: envPure.S3_BUCKET_NAME,
  nodeEnv: envPure.NODE_ENV,
  returnEmail: envPure.RETURN_EMAIL,
  postgresHost: envPure.POSTGRES_HOST,
  postgresPort: envPure.POSTGRES_PORT,
  postgresUser: envPure.POSTGRES_USER,
  postgresPassword: envPure.POSTGRES_PASSWORD,
  postgresDatabase: envPure.POSTGRES_DB,
};
