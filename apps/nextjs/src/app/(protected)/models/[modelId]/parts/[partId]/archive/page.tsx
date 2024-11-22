import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";

import ArchiveModelPartButton from "~/app/(protected)/models/_components/ArchiveModelPartButton";
import { BackButton } from "~/components/BackButton";

interface ArchiveModelPartPageProps {
  params: {
    modelId: string;
    partId: string;
  };
}

export default function ArchiveModelPartPage({
  params,
}: ArchiveModelPartPageProps) {
  const modelId = Number(params.modelId);
  const partId = Number(params.partId);

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
        You will no longer be able to use this part on repairs for this model.
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <BackButton>No</BackButton>
        <ArchiveModelPartButton modelId={modelId} partId={partId}>
          Yes, I am sure
        </ArchiveModelPartButton>
      </CardFooter>
    </Card>
  );
}
