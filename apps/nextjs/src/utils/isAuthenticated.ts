import { cookies } from "next/headers";

export function isAuthenticated() {
  return cookies().has("Authorization");
}

export function onboardingCompleted() {
  if (cookies().has("onboardingCompleted")) {
    return cookies().get("onboardingCompleted")?.value === "true";
  } else {
    return false;
  }
}
