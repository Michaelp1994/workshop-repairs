import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Cookie removed successfully" },
    { status: 200 },
  );

  response.cookies.set({
    name: "Authorization",
    value: "",
    maxAge: 0, // Cookie expires immediately
    path: "/",
  });

  return response;
}
