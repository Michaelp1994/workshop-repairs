"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { DetailsLabel, DetailsList, DetailsValue } from "@repo/ui/details-list";

import MetadataFields from "~/components/MetadataFields";
import { api } from "~/trpc/client";

import RepairStatusBadge from "./RepairStatusBadge";

interface RepairDetailsProps {
  repairId: number;
}

export default function RepairDetails({ repairId }: RepairDetailsProps) {
  const [repair] = api.repairs.getById.useSuspenseQuery({ id: repairId });
  console.log({ repair });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Repair Details</CardTitle>
      </CardHeader>
      <CardContent>
        <DetailsList>
          <DetailsLabel>Type:</DetailsLabel>
          <DetailsValue>{repair.type.name}</DetailsValue>
          <DetailsLabel>Status:</DetailsLabel>
          <DetailsValue>
            <RepairStatusBadge status={repair.status} />
          </DetailsValue>
          <DetailsLabel>Fault:</DetailsLabel>
          <DetailsValue>{repair.fault}</DetailsValue>
          <DetailsLabel>Asset Number:</DetailsLabel>
          <DetailsValue>{repair.asset.assetNumber}</DetailsValue>
          <DetailsLabel>Serial Number:</DetailsLabel>
          <DetailsValue>{repair.asset.serialNumber}</DetailsValue>
          <DetailsLabel>Location:</DetailsLabel>
          <DetailsValue>{repair.location.name}</DetailsValue>
          <DetailsLabel>Model:</DetailsLabel>
          <DetailsValue>{repair.model.name}</DetailsValue>
          <MetadataFields metadata={repair} />
        </DetailsList>
      </CardContent>
    </Card>
  );
}
