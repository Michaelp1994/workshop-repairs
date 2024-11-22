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

import ArchiveModelPartButton from "~/app/(protected)/models/_components/ArchiveModelPartButton";
import { BackButton } from "~/components/BackButton";

interface ArchiveModelModalProps {
  params: {
    modelId: string;
    partId: string;
  };
}

export default function ArchiveModelModal({ params }: ArchiveModelModalProps) {
  const router = useRouter();
  const modelId = Number(params.modelId);
  const partId = Number(params.partId);

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
          You will no longer be able to use this part on repairs for this model.
          <DialogFooter>
            <BackButton>No</BackButton>
            <ArchiveModelPartButton modelId={modelId} partId={partId}>
              Yes, I am sure
            </ArchiveModelPartButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
