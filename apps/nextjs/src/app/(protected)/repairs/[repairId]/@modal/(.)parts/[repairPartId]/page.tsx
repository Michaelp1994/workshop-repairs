"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@repo/ui/dialog";
import { useRouter } from "next/navigation";
import { use } from "react";

import UpdateRepairPartForm from "~/app/(protected)/repairs/_components/UpdateRepairPartForm";

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
  const router = useRouter();
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
