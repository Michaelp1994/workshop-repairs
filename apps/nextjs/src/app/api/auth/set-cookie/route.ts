import { session } from "@repo/validators/auth.validators";
import { NextRequest, NextResponse } from "next/server";

import {
  AUTHORIZATION_COOKIE_NAME,
  ONBOARDING_COOKIE_NAME,
} from "~/auth/cookies";

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

export async function POST(req: NextRequest) {
  try {
    const jsonData = await req.json();
    const { token, onboardingCompleted } = session.parse(jsonData);

    const response = NextResponse.json(
      { message: "Cookie set successfully" },
      { status: 200 },
    );

    response.cookies.set({
      name: AUTHORIZATION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: ONE_DAY_IN_SECONDS,
    });

    response.cookies.set({
      name: ONBOARDING_COOKIE_NAME,
      value: String(onboardingCompleted),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: ONE_DAY_IN_SECONDS,
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
