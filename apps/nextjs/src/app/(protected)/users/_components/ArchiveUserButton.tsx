"use client";
import type { UserID } from "@repo/validators/ids.validators";
import type { ReactNode } from "react";

import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface ArchiveUserButtonProps {
  userId: UserID;
  children: ReactNode;
}

export default function ArchiveUserButton({
  userId,
  children,
}: ArchiveUserButtonProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const archiveMutation = api.users.archive.useMutation({
    async onSuccess(data) {
      await utils.users.getAll.invalidate();
      await utils.users.countAll.invalidate();
      await utils.users.getById.invalidate({
        id: userId,
      });
      toast.success(`${data.firstName} ${data.lastName} has been archived.`);
      router.replace("/users");
    },
    onError(error) {
      displayMutationErrors(error);
    },
  });

  return (
    <Button
      onClick={() => archiveMutation.mutate({ id: userId })}
      variant="destructive"
    >
      {children}
    </Button>
  );
}
