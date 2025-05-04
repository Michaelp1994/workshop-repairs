import { cookies } from "next/headers";

export default async function isAuthenticated() {
  return (await cookies()).has("Authorization");
}
