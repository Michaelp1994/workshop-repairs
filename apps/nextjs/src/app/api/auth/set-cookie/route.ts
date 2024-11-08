import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "JWT token missing" }, { status: 400 });
    }

    const response = NextResponse.json(
      { message: "Cookie set successfully" },
      { status: 200 },
    );

    response.cookies.set({
      name: "Authorization",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to set cookie" },
      { status: 500 },
    );
  }
}
