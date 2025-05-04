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

import generateRepairSlug from "~/utils/generateRepairSlug";

import CreateRepairPartForm from "../../../../_components/CreateRepairPartForm";

interface CreateRepairPartModalProps {
  params: Promise<{ repairId: RepairID }>;
}

export default function CreateRepairPartModal(
  props: CreateRepairPartModalProps,
) {
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
            <DialogTitle>Create Repair Part</DialogTitle>
            <DialogDescription>
              Add a part to {generateRepairSlug(repairId)}
            </DialogDescription>
          </DialogHeader>
          <CreateRepairPartForm repairId={repairId} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
