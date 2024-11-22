"use client";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import ArchiveModal from "~/components/ArchiveModal";
import { api } from "~/trpc/client";

interface ArchiveRepairPartModalProps {
  params: {
    repairId: string;
    repairPartId: string;
  };
}

export default function ArchiveRepairPartModal({
  params,
}: ArchiveRepairPartModalProps) {
  const router = useRouter();
  const utils = api.useUtils();

  const repairId = Number(params.repairId);
  const repairPartId = Number(params.repairPartId);

  const archiveMutation = api.repairParts.archive.useMutation({
    async onSuccess() {
      await utils.repairParts.getAllByRepairId.invalidate({
        id: repairId,
      });
      toast.success("Repair Part has been archived.");
      router.back();
    },
  });

  async function archiveRepair() {
    await archiveMutation.mutateAsync({ id: repairPartId });
  }

  return (
    <ArchiveModal
      description="Are you sure you wish to archive this repair part?"
      onCancel={() => {
        router.back();
      }}
      onConfirm={() => void archiveRepair()}
      title="Archive Repair Part"
    />
  );
}
