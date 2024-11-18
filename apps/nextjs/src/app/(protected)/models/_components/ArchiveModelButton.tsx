"use client";
import type { ModelID } from "@repo/validators/ids.validators";

import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui/sonner";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";
import { getBaseUrl } from "~/utils/getBaseUrl";

interface ArchiveModelButtonProps {
  modelId: ModelID;
}

export default function ArchiveModelButton({
  modelId,
}: ArchiveModelButtonProps) {
  const router = useRouter();
  const modelUrl = `${getBaseUrl()}/models/${modelId}`;
  const archiveMutation = api.models.archive.useMutation({
    onSuccess() {
      toast.success("Repair has been archived.");
      router.replace(modelUrl);
    },
  });

  async function archiveRepair() {
    archiveMutation.mutate({ id: modelId });
  }

  return (
    <Button onClick={archiveRepair} variant="destructive">
      Yes, I am sure
    </Button>
  );
}
