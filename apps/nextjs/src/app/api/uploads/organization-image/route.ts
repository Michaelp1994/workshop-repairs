import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { Resource } from "sst";

import { client } from "~/utils/awsLib";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;
    if (!file || !name) {
      return NextResponse.json(
        { error: "Please include name and fileName" },
        { status: 500 },
      );
    }

    const command = new PutObjectCommand({
      Key: "uploads/" + file.name,
      Bucket: Resource.Bucket1.name,
    });
    const result = await client.send(command);
    // await api.userOnboardings.createOrganization.mutation({
    //   name: name as string,
    //   logo: file as File,
    // });
    console.log({ result });
    const response = NextResponse.json(
      { message: " successful" },
      { status: 200 },
    );

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
