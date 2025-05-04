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
import { use } from "react";

import { BackButton } from "~/components/BackButton";

import ArchiveManufacturerButton from "../../../_components/ArchiveManufacturerButton";

interface ArchiveManufacturerModalProps {
  params: Promise<{
    manufacturerId: string;
  }>;
}

export default function ArchiveManufacturerModal(
  props: ArchiveManufacturerModalProps,
) {
  const params = use(props.params);
  const router = useRouter();
  const manufacturerId = Number(params.manufacturerId);

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
              Are you sure you wish to archive this manufacturer?
            </DialogDescription>
          </DialogHeader>
          This manufacturer will no longer be avaliable.
          <DialogFooter>
            <BackButton>No</BackButton>
            <ArchiveManufacturerButton manufacturerId={manufacturerId}>
              Yes, I am sure
            </ArchiveManufacturerButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
