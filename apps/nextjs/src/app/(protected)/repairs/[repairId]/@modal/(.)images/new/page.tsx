"use client";
import type { RepairID } from "@repo/validators/ids.validators";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";
import { useRouter } from "next/navigation";
import { use } from "react";

import CreateRepairImageForm from "../../../../_components/CreateRepairImageForm";

interface ArchiveRepairModalProps {
  params: Promise<{ repairId: RepairID }>;
}

export default function ArchiveRepairModal(props: ArchiveRepairModalProps) {
  const params = use(props.params);
  const repairId = Number(params.repairId);
  const router = useRouter();

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
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>
              Upload an image to repair {repairId}
            </DialogDescription>
          </DialogHeader>
          <CreateRepairImageForm repairId={repairId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
