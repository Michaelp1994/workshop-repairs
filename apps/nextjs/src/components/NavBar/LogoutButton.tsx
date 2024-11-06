"use client";

import { DropdownMenuItem } from "@repo/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <DropdownMenuItem
      onClick={async () => {
        router.push("/");
      }}
    >
      Logout
    </DropdownMenuItem>
  );
}
