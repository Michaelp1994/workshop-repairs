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
import { useRouter } from "next/navigation";
import { use } from "react";

import ArchiveRepairPartButton from "~/app/(protected)/repairs/_components/ArchiveRepairPartButton";

interface ArchiveRepairPageProps {
  params: Promise<{
    repairId: string;
    repairPartId: string;
  }>;
}

export default function ArchiveRepairPage(props: ArchiveRepairPageProps) {
  const params = use(props.params);
  const router = useRouter();

  const repairPartId = Number(params.repairPartId);

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
        <Button asChild onClick={() => router.back()}>
          No
        </Button>
        <ArchiveRepairPartButton repairPartId={repairPartId}>
          Yes, I am sure
        </ArchiveRepairPartButton>
      </CardFooter>
    </Card>
  );
}
