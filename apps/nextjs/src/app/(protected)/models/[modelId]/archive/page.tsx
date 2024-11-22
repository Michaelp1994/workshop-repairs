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

import ArchiveModelButton from "../../_components/ArchiveModelButton";

interface ArchiveModelPageProps {
  params: {
    modelId: string;
  };
}

export default function ArchiveModelPage({ params }: ArchiveModelPageProps) {
  const modelId = Number(params.modelId);

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
      <CardContent>This model will no longer be avaliable.</CardContent>
      <CardFooter className="flex justify-end gap-4">
        <BackButton>No</BackButton>
        <ArchiveModelButton modelId={modelId}>
          Yes, I am sure
        </ArchiveModelButton>
      </CardFooter>
    </Card>
  );
}
