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

import ArchiveRepairButton from "../../_components/ArchiveRepairButton";

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
        <CardHeaderText>
          <CardTitle>Confirm Archive</CardTitle>
          <CardDescription>
            Are you sure you wish to archive this repair?
          </CardDescription>
        </CardHeaderText>
      </CardHeader>
      <CardContent>This repair will no longer be avaliable.</CardContent>
      <CardFooter className="flex justify-end gap-4">
        <BackButton>No</BackButton>
        <ArchiveRepairButton repairId={repairId}>
          Yes, I am sure
        </ArchiveRepairButton>
      </CardFooter>
    </Card>
  );
}
