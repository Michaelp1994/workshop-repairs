import type { ClientID } from "@repo/validators/ids.validators";
import type { ReactNode } from "react";

import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/sonner";
import { useNavigate } from "@tanstack/react-router";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface ArchiveClientButtonProps {
  clientId: ClientID;
  children: ReactNode;
}

export default function ArchiveClientButton({
  clientId,
  children,
}: ArchiveClientButtonProps) {
  const navigate = useNavigate();
  const utils = api.useUtils();
  const archiveMutation = api.clients.archive.useMutation({
    async onSuccess(data) {
      await utils.clients.getAll.invalidate();
      await utils.clients.countAll.invalidate();
      await utils.clients.getById.invalidate({
        id: clientId,
      });
      toast.success(`${data.name} has been archived.`);
      router.replace("/clients");
    },
    onError(error) {
      displayMutationErrors(error);
    },
  });

  return (
    <Button
      onClick={() => archiveMutation.mutate({ id: clientId })}
      variant="destructive"
    >
      {children}
    </Button>
  );
}
