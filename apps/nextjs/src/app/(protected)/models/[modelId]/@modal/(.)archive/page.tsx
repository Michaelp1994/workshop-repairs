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

import { BackButton } from "~/components/BackButton";

import ArchiveModelButton from "../../../_components/ArchiveModelButton";

interface ArchiveModelModalProps {
  params: {
    modelId: string;
  };
}

export default function ArchiveModelModal({ params }: ArchiveModelModalProps) {
  const router = useRouter();
  const modelId = Number(params.modelId);

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
              Are you sure you wish to archive this item?
            </DialogDescription>
          </DialogHeader>
          This model will no longer be avaliable.
          <DialogFooter>
            <BackButton>No</BackButton>
            <ArchiveModelButton modelId={modelId}>
              Yes, I am sure
            </ArchiveModelButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
