"use client";
import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { toast } from "@repo/ui/sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import { getBaseUrl } from "~/utils/getBaseUrl";

interface ArchiveModelPageProps {
  params: {
    modelId: string;
  };
}

export default function ArchiveModelPage({ params }: ArchiveModelPageProps) {
  const router = useRouter();
  const modelId = Number(params.modelId);
  const modelUrl = `${getBaseUrl()}/models/${modelId}`;

  const archiveMutation = api.models.archive.useMutation({
    onSuccess() {
      toast.success("Repair has been archived.");
      router.replace(modelUrl);
    },
  });

  async function archiveRepair() {
    await archiveMutation.mutateAsync({ id: modelId });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirm Archive</CardTitle>
        <CardDescription>
          Are you sure you wish to archive this item?
        </CardDescription>
      </CardHeader>
      <CardContent>This repair will no longer be avaliable.</CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button asChild>
          <Link href={modelUrl}>No</Link>
        </Button>
        <Button onClick={archiveRepair} variant="destructive">
          Yes, I am sure
        </Button>
      </CardFooter>
    </Card>
  );
}
