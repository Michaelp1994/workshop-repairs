"use client";
import type { ModelID, PartID } from "@repo/validators/ids.validators";
import type { ReactNode } from "react";

import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface ArchiveModelPartButtonProps {
  modelId: ModelID;
  partId: PartID;
  children: ReactNode;
}

export default function ArchiveModelPartButton({
  modelId,
  partId,
  children,
}: ArchiveModelPartButtonProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const archiveMutation = api.partsToModels.archive.useMutation({
    async onSuccess() {
      await utils.partsToModels.getByIds.invalidate({ modelId, partId });
      await utils.partsToModels.getAllPartsByModelId.invalidate();
      await utils.partsToModels.getAllModelsByPartId.invalidate();
      toast.success(`Connection has been archived.`);
      router.back();
    },
    onError(error) {
      displayMutationErrors(error);
    },
  });

  return (
    <Button
      onClick={() => archiveMutation.mutate({ modelId, partId })}
      variant="destructive"
    >
      {children}
    </Button>
  );
}
