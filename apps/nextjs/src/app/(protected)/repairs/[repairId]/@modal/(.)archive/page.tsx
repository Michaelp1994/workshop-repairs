"use client";
import type { RepairID } from "@repo/validators/ids.validators";

import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import ArchiveModal from "~/components/ArchiveModal";
import { api } from "~/trpc/react";
0;

interface ArchiveRepairModalProps {
  params: { repairId: RepairID };
}

export default function ArchiveRepairModal({
  params,
}: ArchiveRepairModalProps) {
  const repairId = Number(params.repairId);
  const router = useRouter();
  const archiveMutation = api.repairs.archive.useMutation({});
  async function archiveRepair() {
    await archiveMutation.mutateAsync({ id: repairId });
    toast.success("Repair has been archived.");
    router.back();
  }
  return (
    <ArchiveModal
      description="Are you sure you wish to archive this repair?"
      onCancel={() => {
        router.back();
      }}
      onConfirm={() => void archiveRepair()}
      title="Archive Repair"
    />
  );
}
