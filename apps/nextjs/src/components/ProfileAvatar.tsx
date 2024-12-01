"use client";
import { Avatar, AvatarFallback } from "@repo/ui/avatar";
import { Button } from "@repo/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import { LogOut } from "@repo/ui/icons";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";
import getInitials from "~/utils/getInitials";

export default function ProfileAvatar() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user] = api.users.getCurrentUser.useSuspenseQuery({});
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-10 w-10" variant="ghost">
          <Avatar className="h-10 w-10">
            {/* <AvatarImage alt="@shadcn" src="/avatars/01.png" /> */}
            <AvatarFallback className="bg-primary text-primary-foreground">
              <span>{getInitials(user.firstName, user.lastName)}</span>
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logoutMutation.mutate({})}>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
