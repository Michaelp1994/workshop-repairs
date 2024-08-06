import type { ManufacturerID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import UpdateManufacturerForm from "../UpdateManufacturerForm";

interface ManufacturerDetailsSectionProps {
  manufacturerId: ManufacturerID;
}

export default function ManufacturerDetailsSection({
  manufacturerId,
}: ManufacturerDetailsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manufacturer Details</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateManufacturerForm manufacturerId={manufacturerId} />
      </CardContent>
    </Card>
  );
}
