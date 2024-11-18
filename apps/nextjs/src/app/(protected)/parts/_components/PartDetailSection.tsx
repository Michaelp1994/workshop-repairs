import type { PartID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import UpdatePartForm from "./UpdatePartForm";

interface PartDetailSectionProps {
  partId: PartID;
}

export default function PartDetailSection({ partId }: PartDetailSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Part Details</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdatePartForm partId={partId} />
      </CardContent>
    </Card>
  );
}
