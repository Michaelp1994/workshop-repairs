"use client";
import type { EquipmentTypeID } from "@repo/validators/ids.validators";
import type { ReactNode } from "react";

import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import displayMutationErrors from "~/utils/displayMutationErrors";

interface ArchiveEquipmentTypeButtonProps {
  equipmentTypeId: EquipmentTypeID;
  children: ReactNode;
}

export default function ArchiveEquipmentTypeButton({
  equipmentTypeId,
  children,
}: ArchiveEquipmentTypeButtonProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const archiveMutation = api.equipmentTypes.archive.useMutation({
    async onSuccess(data) {
      await utils.equipmentTypes.getAll.invalidate();
      await utils.equipmentTypes.countAll.invalidate();
      await utils.equipmentTypes.getById.invalidate({
        id: equipmentTypeId,
      });
      toast.success(`${data.name} has been archived.`);
      router.replace("/equipment-types");
    },
    onError(error) {
      displayMutationErrors(error);
    },
  });

  return (
    <Button
      onClick={() => archiveMutation.mutate({ id: equipmentTypeId })}
      variant="destructive"
    >
      {children}
    </Button>
  );
}
