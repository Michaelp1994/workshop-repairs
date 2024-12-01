"use client";

import { DropdownMenuItem } from "@repo/ui/dropdown-menu";
import { LogOut } from "@repo/ui/icons";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

export default function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logoutMutation = api.auth.logout.useMutation({
    async onSuccess() {
      queryClient.clear();
      router.push("/");
      router.refresh();
    },
    async onError(errors) {
      displayMutationErrors(errors);
    },
  });

  return (
    <DropdownMenuItem onClick={() => logoutMutation.mutate({})}>
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
}
