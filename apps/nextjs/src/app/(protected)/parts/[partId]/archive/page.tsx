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

import ArchivePartButton from "../../_components/ArchivePartButton";

interface ArchivePartPageProps {
  params: Promise<{
    partId: string;
  }>;
}

export default async function ArchivePartPage(props: ArchivePartPageProps) {
  const params = await props.params;
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
      <CardContent>This Part will no longer be avaliable.</CardContent>
      <CardFooter className="flex justify-end gap-4">
        <BackButton>No</BackButton>
        <ArchivePartButton partId={partId}>Yes, I am sure</ArchivePartButton>
      </CardFooter>
    </Card>
  );
}
