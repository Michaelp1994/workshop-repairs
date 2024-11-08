// app/api/delete-cookie/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.json(
    { message: "Cookie has been deleted!" },
    { status: 200 },
  );

  // Delete the Authorization cookie by setting it to expire in the past
  response.cookies.set("Authorization", "", {
    expires: new Date(), // Set the expiration to a past date to delete
  });

  return response;
}
