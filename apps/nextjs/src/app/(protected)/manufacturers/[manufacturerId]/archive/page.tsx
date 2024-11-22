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

import ArchiveManufacturerButton from "../../_components/ArchiveManufacturerButton";

interface ArchiveManufacturerPageProps {
  params: {
    manufacturerId: string;
  };
}

export default function ArchiveManufacturerPage({
  params,
}: ArchiveManufacturerPageProps) {
  const manufacturerId = Number(params.manufacturerId);

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
      <CardContent>This manufacturer will no longer be avaliable.</CardContent>
      <CardFooter className="flex justify-end gap-4">
        <BackButton>No</BackButton>
        <ArchiveManufacturerButton manufacturerId={manufacturerId}>
          Yes, I am sure
        </ArchiveManufacturerButton>
      </CardFooter>
    </Card>
  );
}
