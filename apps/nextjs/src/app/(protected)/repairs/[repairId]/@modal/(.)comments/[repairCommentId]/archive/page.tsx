"use client";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import ArchiveModal from "~/components/ArchiveModal";
import { api } from "~/trpc/react";

interface ArchiveCommentModalProps {
  params: {
    repairId: string;
    repairPartId: string;
  };
}

export default function ArchiveCommentModal({
  params,
}: ArchiveCommentModalProps) {
  const router = useRouter();
  const utils = api.useUtils();

  const repairId = Number(params.repairId);
  const repairPartId = Number(params.repairPartId);

  const archiveMutation = api.repairComments.archive.useMutation({
    async onSuccess() {
      await utils.repairComments.getAllByRepairId.invalidate({
        repairId,
      });
      toast.success("Repair Comment has been archived.");
      router.back();
    },
  });

  async function archiveRepairComment() {
    await archiveMutation.mutateAsync({ id: repairPartId });
  }

  return (
    <ArchiveModal
      description="Are you sure you wish to archive this comment?"
      onCancel={() => {
        router.back();
      }}
      onConfirm={() => void archiveRepairComment()}
      title="Archive Repair Comment"
    />
  );
}
