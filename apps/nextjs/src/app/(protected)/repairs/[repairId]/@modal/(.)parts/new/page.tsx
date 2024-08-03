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

import CreateRepairPartForm from "../../../../_components/CreateRepairPartForm";

interface CreateRepairPartModalProps {
  params: { repairId: RepairID };
}

export default function CreateRepairPartModal({
  params,
}: CreateRepairPartModalProps) {
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
            <DialogTitle>Create Repair Part</DialogTitle>
            <DialogDescription>
              Add a part to repair {repairId}
            </DialogDescription>
          </DialogHeader>
          <CreateRepairPartForm repairId={repairId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
