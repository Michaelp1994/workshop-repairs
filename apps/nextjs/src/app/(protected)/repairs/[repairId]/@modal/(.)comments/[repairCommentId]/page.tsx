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

import UpdateRepairCommentForm from "~/app/(protected)/repairs/_components/UpdateRepairCommentForm";

interface RepairImagesModalProps {
  params: { repairId: RepairID; repairCommentId: string };
}

export default function UpdateRepairCommentModal({
  params,
}: RepairImagesModalProps) {
  const repairId = Number(params.repairId);
  const repairCommentId = Number(params.repairCommentId);
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
            <DialogTitle>Update Repair Comment</DialogTitle>
            <DialogDescription>
              Update repair comment for repair {repairId}
            </DialogDescription>
          </DialogHeader>
          <UpdateRepairCommentForm
            repairCommentId={repairCommentId}
            repairId={repairId}
          />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
