"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { DetailsLabel, DetailsList, DetailsValue } from "@repo/ui/details-list";

import MetadataFields from "~/components/MetadataFields";
import { api } from "~/trpc/client";

interface EquipmentTypeDetailsProps {
  equipmentTypeId: number;
}

export default function EquipmentTypeDetails({
  equipmentTypeId,
}: EquipmentTypeDetailsProps) {
  const [equipmentType] = api.equipmentTypes.getById.useSuspenseQuery({
    id: equipmentTypeId,
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipment Type Details</CardTitle>
      </CardHeader>
      <CardContent>
        <DetailsList>
          <DetailsLabel>Name:</DetailsLabel>
          <DetailsValue>{equipmentType.name}</DetailsValue>
          <MetadataFields metadata={equipmentType} />
        </DetailsList>
      </CardContent>
    </Card>
  );
}
