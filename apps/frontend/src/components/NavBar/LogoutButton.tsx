import { DropdownMenuItem } from "@repo/ui/dropdown-menu";
import { LogOut } from "@repo/ui/icons";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

export default function LogoutButton() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logoutMutation = api.auth.logout.useMutation({
    async onSuccess() {
      queryClient.clear();
      await navigate({ to: "/" });
    },
    onError(errors) {
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
