"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import CreateRepairImageForm from "../../../_components/CreateRepairImageForm";

interface ArchiveRepairPageProps {
  params: {
    repairId: string;
  };
}

export default function ArchiveRepairPage({ params }: ArchiveRepairPageProps) {
  const repairId = Number(params.repairId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image</CardTitle>
        <CardDescription>Add image to repair {repairId}</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateRepairImageForm repairId={repairId} />
      </CardContent>
    </Card>
  );
}
