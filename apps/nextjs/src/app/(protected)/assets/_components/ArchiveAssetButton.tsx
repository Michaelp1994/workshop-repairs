"use client";
import type { ClientID } from "@repo/validators/ids.validators";
import type { ReactNode } from "react";

import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";
import generateAssetSlug from "~/utils/generateAssetSlug";

interface ArchiveAssetButtonProps {
  assetId: ClientID;
  children: ReactNode;
}

export default function ArchiveAssetButton({
  assetId,
  children,
}: ArchiveAssetButtonProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const archiveMutation = api.assets.archive.useMutation({
    async onSuccess() {
      await utils.assets.getAll.invalidate();
      await utils.assets.countAll.invalidate();
      await utils.assets.getById.invalidate({
        id: assetId,
      });
      toast.success(`${generateAssetSlug(assetId)} has been archived.`);
      router.replace("/assets");
    },
    onError(error) {
      displayMutationErrors(error);
    },
  });

  return (
    <Button
      onClick={() => archiveMutation.mutate({ id: assetId })}
      variant="destructive"
    >
      {children}
    </Button>
  );
}
