"use client";
import type { ModelID } from "@repo/validators/ids.validators";
import type { ReactNode } from "react";

import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface ArchiveModelButtonProps {
  modelId: ModelID;
  children: ReactNode;
}

export default function ArchiveModelButton({
  modelId,
  children,
}: ArchiveModelButtonProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const archiveMutation = api.models.archive.useMutation({
    async onSuccess(data) {
      await utils.models.getAll.invalidate();
      await utils.models.countAll.invalidate();
      await utils.models.getById.invalidate({
        id: modelId,
      });
      toast.success(`${data.name} has been archived.`);
      router.back();
    },
    onError(error) {
      displayMutationErrors(error);
    },
  });

  return (
    <Button
      onClick={() => archiveMutation.mutate({ id: modelId })}
      variant="destructive"
    >
      {children}
    </Button>
  );
}
