import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";

import ArchiveRepairCommentButton from "~/app/(protected)/repairs/_components/ArchiveRepairCommentButton";
import { BackButton } from "~/components/BackButton";

interface ArchiveRepairCommentPageProps {
  params: {
    repairId: string;
    repairCommentId: string;
  };
}

export default function ArchiveRepairCommentPage({
  params,
}: ArchiveRepairCommentPageProps) {
  const repairCommentId = Number(params.repairCommentId);

  return (
    <Card>
      <CardHeader>
        <CardHeaderText>
          <CardTitle>Confirm Archive</CardTitle>
          <CardDescription>
            Are you sure you wish to archive this comment?
          </CardDescription>
        </CardHeaderText>
      </CardHeader>
      <CardContent>This repair comment will no longer be shown.</CardContent>
      <CardFooter className="flex justify-end gap-4">
        <BackButton>No</BackButton>
        <ArchiveRepairCommentButton repairCommentId={repairCommentId}>
          Yes, I am sure
        </ArchiveRepairCommentButton>
      </CardFooter>
    </Card>
  );
}
