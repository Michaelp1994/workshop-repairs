// app/api/set-cookie/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }
  const response = NextResponse.json({ message: "Cookie has been set!" });

  // Set the Authorization cookie with secure, httpOnly, and sameSite options
  response.cookies.set("Authorization", token, {
    maxAge: 24 * 60 * 60, // 1 day in seconds
  });

  return response;
}
