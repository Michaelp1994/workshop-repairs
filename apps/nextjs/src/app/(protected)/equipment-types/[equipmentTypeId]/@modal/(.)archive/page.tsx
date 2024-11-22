"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";
import { useRouter } from "next/navigation";

import { BackButton } from "~/components/BackButton";

import ArchiveEquipmentTypeButton from "../../../_components/ArchiveEquipmentTypeButton";

interface ArchiveEquipmentTypeModalProps {
  params: {
    equipmentTypeId: string;
  };
}

export default function ArchiveEquipmentTypeModal({
  params,
}: ArchiveEquipmentTypeModalProps) {
  const router = useRouter();
  const equipmentTypeId = Number(params.equipmentTypeId);

  return (
    <Dialog
      defaultOpen
      onOpenChange={() => {
        router.back();
      }}
      open
    >
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Archive</DialogTitle>
            <DialogDescription>
              Are you sure you wish to archive this Equipment Type?
            </DialogDescription>
          </DialogHeader>
          This Equipment Type will no longer be avaliable.
          <DialogFooter>
            <BackButton>No</BackButton>
            <ArchiveEquipmentTypeButton equipmentTypeId={equipmentTypeId}>
              Yes, I am sure
            </ArchiveEquipmentTypeButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
