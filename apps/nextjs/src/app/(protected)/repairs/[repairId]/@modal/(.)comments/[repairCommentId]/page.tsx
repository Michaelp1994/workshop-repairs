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
import { use } from "react";

import UpdateRepairCommentForm from "~/app/(protected)/repairs/_components/UpdateRepairCommentForm";
import generateRepairSlug from "~/utils/generateRepairSlug";

interface RepairImagesModalProps {
  params: Promise<{ repairId: string; repairCommentId: string }>;
}

export default function UpdateRepairCommentModal(
  props: RepairImagesModalProps,
) {
  const params = use(props.params);
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
              Update repair comment for repair {generateRepairSlug(repairId)}
            </DialogDescription>
          </DialogHeader>
          <UpdateRepairCommentForm repairCommentId={repairCommentId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
