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

import ArchiveAssetButton from "../../../_components/ArchiveAssetButton";

interface ArchiveAssetModalProps {
  params: Promise<{
    assetId: string;
  }>;
}

export default function ArchiveAssetModal(props: ArchiveAssetModalProps) {
  const params = use(props.params);
  const router = useRouter();
  const assetId = Number(params.assetId);

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
              Are you sure you wish to archive this asset?
            </DialogDescription>
          </DialogHeader>
          This asset will no longer be avaliable.
          <DialogFooter>
            <BackButton>No</BackButton>
            <ArchiveAssetButton assetId={assetId}>
              Yes, I am sure
            </ArchiveAssetButton>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
