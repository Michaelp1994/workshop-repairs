import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";

import { BackButton } from "~/components/BackButton";

import ArchiveEquipmentTypeButton from "../../_components/ArchiveEquipmentTypeButton";

interface ArchiveEquipmentTypePageProps {
  params: Promise<{
    equipmentTypeId: string;
  }>;
}

export default async function ArchiveEquipmentTypePage(
  props: ArchiveEquipmentTypePageProps,
) {
  const params = await props.params;
  const equipmentTypeId = Number(params.equipmentTypeId);

  return (
    <Card>
      <CardHeader>
        <CardHeaderText>
          <CardTitle>Confirm Archive</CardTitle>
          <CardDescription>
            Are you sure you wish to archive this item?
          </CardDescription>
        </CardHeaderText>
      </CardHeader>
      <CardContent>
        This Equipment Type will no longer be avaliable.
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <BackButton>No</BackButton>
        <ArchiveEquipmentTypeButton equipmentTypeId={equipmentTypeId}>
          Yes, I am sure
        </ArchiveEquipmentTypeButton>
      </CardFooter>
    </Card>
  );
}
