"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";
import { use } from "react";

import CreateRepairImageForm from "../../../_components/CreateRepairImageForm";

interface ArchiveRepairPageProps {
  params: Promise<{
    repairId: string;
  }>;
}

export default function ArchiveRepairPage(props: ArchiveRepairPageProps) {
  const params = use(props.params);
  const repairId = Number(params.repairId);

  return (
    <Card>
      <CardHeader>
        <CardHeaderText>
          <CardTitle>Image</CardTitle>
          <CardDescription>Add image to repair {repairId}</CardDescription>
        </CardHeaderText>
      </CardHeader>
      <CardContent>
        <CreateRepairImageForm repairId={repairId} />
      </CardContent>
    </Card>
  );
}
