"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { DetailsLabel, DetailsList, DetailsValue } from "@repo/ui/details-list";

import { api } from "~/trpc/client";

interface ModelDetailsSectionProps {
  modelId: number;
}

export default function ModelDetailsSection({
  modelId,
}: ModelDetailsSectionProps) {
  const [model] = api.models.getById.useSuspenseQuery({ id: modelId });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Details</CardTitle>
      </CardHeader>
      <CardContent>
        <DetailsList>
          <DetailsLabel>Name:</DetailsLabel>
          <DetailsValue>{model.name}</DetailsValue>
          <DetailsLabel>Equipment Type:</DetailsLabel>
          <DetailsValue>{model.equipmentType.name}</DetailsValue>
          <DetailsLabel>Manufacturer:</DetailsLabel>
          <DetailsValue>{model.manufacturer.name}</DetailsValue>
        </DetailsList>
      </CardContent>
    </Card>
  );
}
