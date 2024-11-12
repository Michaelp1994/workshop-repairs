import { NextResponse } from "next/server";

import {
  AUTHORIZATION_COOKIE_NAME,
  ONBOARDING_COOKIE_NAME,
} from "~/auth/cookies";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Cookie removed successfully" },
      { status: 200 },
    );

    response.cookies.set({
      name: AUTHORIZATION_COOKIE_NAME,
      value: "",
      maxAge: 0,
      path: "/",
    });

    response.cookies.set({
      name: ONBOARDING_COOKIE_NAME,
      value: "",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to remove cookie" },
      { status: 500 },
    );
  }
}
