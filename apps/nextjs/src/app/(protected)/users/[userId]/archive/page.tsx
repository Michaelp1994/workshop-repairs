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

import ArchiveUserButton from "../../_components/ArchiveUserButton";

interface ArchiveUserPageProps {
  params: {
    userId: string;
  };
}

export default function ArchiveUserPage({ params }: ArchiveUserPageProps) {
  const userId = Number(params.userId);

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
      <CardContent>This user will no longer be avaliable.</CardContent>
      <CardFooter className="flex justify-end gap-4">
        <BackButton>No</BackButton>
        <ArchiveUserButton userId={userId}>Yes, I am sure</ArchiveUserButton>
      </CardFooter>
    </Card>
  );
}
