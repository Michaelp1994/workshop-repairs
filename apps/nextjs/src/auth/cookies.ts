import { cookies } from "next/headers";

export const AUTHORIZATION_COOKIE_NAME = "Authorization";

export const ONBOARDING_COOKIE_NAME = "OnboardingCompleted";

export function isAuthenticated() {
  const hasAuth = cookies().has(AUTHORIZATION_COOKIE_NAME);
  return hasAuth;
}

export function onboardingCompleted() {
  if (cookies().has(ONBOARDING_COOKIE_NAME)) {
    const value = cookies().get(ONBOARDING_COOKIE_NAME)?.value;
    return value === "true";
  } else {
    return false;
  }
}
