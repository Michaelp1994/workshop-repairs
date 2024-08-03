"use client";
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

import UpdateRepairPartForm from "~/app/(protected)/repairs/_components/UpdateRepairPartForm";

interface UpdateRepairPartModalProps {
  params: {
    repairId: string;
    repairPartId: string;
  };
}

export default function UpdateRepairPartModal({
  params,
}: UpdateRepairPartModalProps) {
  const router = useRouter();
  const repairId = Number(params.repairId);
  const repairPartId = Number(params.repairPartId);

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
            <DialogTitle>Update Repair Part</DialogTitle>
            <DialogDescription>
              Update Repair Part {repairPartId}
            </DialogDescription>
          </DialogHeader>
          <UpdateRepairPartForm
            repairId={repairId}
            repairPartId={repairPartId}
          />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
