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

import ArchiveLocationButton from "../../_components/ArchiveLocationButton";

interface ArchiveLocationPageProps {
  params: {
    locationId: string;
  };
}

export default function ArchiveLocationPage({
  params,
}: ArchiveLocationPageProps) {
  const locationId = Number(params.locationId);

  return (
    <Card>
      <CardHeader>
        <CardHeaderText>
          <CardTitle>Confirm Archive</CardTitle>
          <CardDescription>
            Are you sure you wish to archive this location?
          </CardDescription>
        </CardHeaderText>
      </CardHeader>
      <CardContent>This location will no longer be avaliable.</CardContent>
      <CardFooter className="flex justify-end gap-4">
        <BackButton>No</BackButton>
        <ArchiveLocationButton locationId={locationId}>
          Yes, I am sure
        </ArchiveLocationButton>
      </CardFooter>
    </Card>
  );
}
