import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import { use } from "react";

import UpdateRepairPartForm from "~/components/forms/UpdateRepairPartForm";

interface UpdateRepairPartModalProps {
  params: Promise<{
    repairId: string;
    repairPartId: string;
  }>;
}

export default function UpdateRepairPartModal(
  props: UpdateRepairPartModalProps,
) {
  const params = use(props.params);
  const navigate = useNavigate();
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
          </DialogHeader>
          <UpdateRepairPartForm repairPartId={repairPartId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
