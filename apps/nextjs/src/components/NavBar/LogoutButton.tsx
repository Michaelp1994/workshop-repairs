"use client";

import { DropdownMenuItem } from "@repo/ui/dropdown-menu";

import logout from "~/app/actions";

export default function LogoutButton() {
  return <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>;
}
