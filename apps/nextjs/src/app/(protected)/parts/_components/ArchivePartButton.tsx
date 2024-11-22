"use client";
import type { PartID } from "@repo/validators/ids.validators";
import type { ReactNode } from "react";

import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface ArchivePartButtonProps {
  partId: PartID;
  children: ReactNode;
}

export default function ArchivePartButton({
  partId,
  children,
}: ArchivePartButtonProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const archiveMutation = api.parts.archive.useMutation({
    async onSuccess(data) {
      await utils.parts.getAll.invalidate();
      await utils.parts.countAll.invalidate();
      await utils.parts.getById.invalidate({
        id: partId,
      });
      toast.success(`${data.name} has been archived.`);
      router.replace("/parts");
    },
    onError(error) {
      displayMutationErrors(error);
    },
  });

  return (
    <Button
      onClick={() => archiveMutation.mutate({ id: partId })}
      variant="destructive"
    >
      {children}
    </Button>
  );
}
