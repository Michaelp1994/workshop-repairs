"use client";

import { DropdownMenuItem } from "@repo/ui/dropdown-menu";
import { LogOut } from "@repo/ui/icons";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";

export default function LogoutButton() {
  const router = useRouter();
  const utils = api.useUtils();
  return (
    <DropdownMenuItem
      onClick={async () => {
        await utils.invalidate();
        router.push("/");
      }}
    >
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
}
