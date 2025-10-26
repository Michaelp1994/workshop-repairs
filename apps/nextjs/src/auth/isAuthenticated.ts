import { cookies } from "next/headers";

export default async function isAuthenticated() {
  const allCookies = await cookies();
  console.log(allCookies.getAll());
  return allCookies.has("Authorization");
}
