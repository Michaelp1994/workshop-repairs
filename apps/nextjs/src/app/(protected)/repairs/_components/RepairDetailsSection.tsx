"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { DetailsLabel, DetailsList, DetailsValue } from "@repo/ui/details-list";

import { api } from "~/trpc/client";

interface RepairDetailsSectionProps {
  repairId: number;
}

export default function RepairDetailsSection({
  repairId,
}: RepairDetailsSectionProps) {
  const [repair] = api.repairs.getById.useSuspenseQuery({ id: repairId });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Repair Details</CardTitle>
      </CardHeader>
      <CardContent>
        <DetailsList>
          <DetailsLabel>Type:</DetailsLabel>
          <DetailsValue>{repair.type.name}</DetailsValue>
          <DetailsLabel>Asset Number:</DetailsLabel>
          <DetailsValue>{repair.asset.assetNumber}</DetailsValue>
          <DetailsLabel>Serial Number:</DetailsLabel>
          <DetailsValue>{repair.asset.serialNumber}</DetailsValue>
          <DetailsLabel>Status:</DetailsLabel>
          <DetailsValue>{repair.status.name}</DetailsValue>
          <DetailsLabel>Location:</DetailsLabel>
          <DetailsValue>{repair.location.name}</DetailsValue>
          <DetailsLabel>Model:</DetailsLabel>
          <DetailsValue>{repair.model.name}</DetailsValue>
        </DetailsList>
      </CardContent>
    </Card>
  );
}
