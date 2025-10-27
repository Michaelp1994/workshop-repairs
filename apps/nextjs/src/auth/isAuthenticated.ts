import { cookies } from "next/headers";

export default async function isAuthenticated() {
  const allCookies = await cookies();
  return allCookies.has("Authorization");
}
