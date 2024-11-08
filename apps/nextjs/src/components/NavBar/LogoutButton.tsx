"use client";

import { DropdownMenuItem } from "@repo/ui/dropdown-menu";
import { useRouter } from "next/navigation";

import { useAuth } from "~/trpc/AuthContext";

export default function LogoutButton() {
  const router = useRouter();
  const { removeAuth } = useAuth();
  return (
    <DropdownMenuItem
      onClick={async () => {
        await removeAuth();
        router.push("/");
      }}
    >
      Logout
    </DropdownMenuItem>
  );
}
