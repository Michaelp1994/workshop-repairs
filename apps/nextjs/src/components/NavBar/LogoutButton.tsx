"use client";

import { DropdownMenuItem } from "@repo/ui/dropdown-menu";
import { useRouter } from "next/navigation";

import { removeAuthCookie } from "~/utils/setCookie";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <DropdownMenuItem
      onClick={async () => {
        await removeAuthCookie();
        router.push("/");
      }}
    >
      Logout
    </DropdownMenuItem>
  );
}
