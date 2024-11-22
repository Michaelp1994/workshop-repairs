"use client";
import type { ManufacturerID } from "@repo/validators/ids.validators";
import type { ReactNode } from "react";

import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface ArchiveManufacturerButtonProps {
  manufacturerId: ManufacturerID;
  children: ReactNode;
}

export default function ArchiveManufacturerButton({
  manufacturerId,
  children,
}: ArchiveManufacturerButtonProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const archiveMutation = api.manufacturers.archive.useMutation({
    async onSuccess(data) {
      await utils.manufacturers.getAll.invalidate();
      await utils.manufacturers.countAll.invalidate();
      await utils.manufacturers.getById.invalidate({
        id: manufacturerId,
      });
      toast.success(`${data.name} has been archived.`);
      router.replace("/manufacturers");
    },
    onError(error) {
      displayMutationErrors(error);
    },
  });

  return (
    <Button
      onClick={() => archiveMutation.mutate({ id: manufacturerId })}
      variant="destructive"
    >
      {children}
    </Button>
  );
}
