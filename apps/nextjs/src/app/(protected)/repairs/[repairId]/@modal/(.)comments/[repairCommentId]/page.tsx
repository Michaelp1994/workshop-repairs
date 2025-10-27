import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import { use } from "react";

import UpdateRepairCommentForm from "~/components/forms/UpdateRepairCommentForm";
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
  const navigate = useNavigate();
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
