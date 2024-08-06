import type { LocationID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import UpdateLocationForm from "../UpdateLocationForm";

interface LocationDetailssSectionProps {
  locationId: LocationID;
}

export default function LocationDetailsSection({
  locationId,
}: LocationDetailssSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateLocationForm locationId={locationId} />
      </CardContent>
    </Card>
  );
}
