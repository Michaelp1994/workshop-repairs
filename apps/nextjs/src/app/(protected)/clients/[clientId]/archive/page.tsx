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

import ArchiveClientButton from "../../_components/ArchiveClientButton";

interface ArchiveClientPageProps {
  params: {
    clientId: string;
  };
}

export default function ArchiveClientPage({ params }: ArchiveClientPageProps) {
  const clientId = Number(params.clientId);

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
      <CardContent>This client will no longer be avaliable.</CardContent>
      <CardFooter className="flex justify-end gap-4">
        <BackButton>No</BackButton>
        <ArchiveClientButton clientId={clientId}>
          Yes, I am sure
        </ArchiveClientButton>
      </CardFooter>
    </Card>
  );
}
