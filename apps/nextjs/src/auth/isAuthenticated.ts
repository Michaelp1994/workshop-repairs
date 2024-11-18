import { cookies } from "next/headers";

export default function isAuthenticated() {
  return cookies().has("Authorization");
}
