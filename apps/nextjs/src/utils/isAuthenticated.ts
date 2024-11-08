import { cookies } from "next/headers";

export function isAuthenticated() {
  console.log("checking auth....");
  const isAuthed = cookies().has("Authorization");

  return isAuthed;
}
