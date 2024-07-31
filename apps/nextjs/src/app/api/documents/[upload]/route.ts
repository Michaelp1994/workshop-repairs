import {
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { type NextRequest, NextResponse } from "next/server";

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set");
}

if (!process.env.AWS_REGION || !process.env.AMPLIFY_BUCKET) {
  throw new Error("AWS_REGION and AMPLIFY_BUCKET must be set");
}

const Bucket = process.env.AMPLIFY_BUCKET;
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// endpoint to get the list of files in the bucket
export async function GET() {
  console.log("sending....");
  const command = new PutObjectCommand({
    Bucket,
    Key: "test.txt",
    Body: "Hello World!",
  });
  const response = await s3.send(command);
  console.log("saved");
  console.log(response);
  const allObjects = await s3.send(new ListObjectsCommand({ Bucket }));
  return NextResponse.json(allObjects.Contents ?? []);
}

// // endpoint to upload a file to the bucket
// export async function POST(request: NextRequest) {
//   //   const formData = await request.formData();
//   //   const files = formData.getAll("file") as File[];

//   //   const response = await Promise.all(
//   //     files.map(async (file) => {
//   //       // not sure why I have to override the types here
//   //     //   const Body = (await file.arrayBuffer()) as Buffer;
//   //       const command = new PutObjectCommand({ Bucket, Key: file.name, Body });
//   //       s3.send(command);
//   //     }),
//   //   );

//   return NextResponse.json(response);
// }
