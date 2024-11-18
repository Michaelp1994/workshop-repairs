import type { ManufacturerID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import ModelsTable from "~/app/(protected)/models/_components/ModelsTable";

interface ManufacturerModelsSectionProps {
  manufacturerId: ManufacturerID;
}

export default function ManufacturerModelsSection({}: ManufacturerModelsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Models</CardTitle>
      </CardHeader>
      <CardContent>
        <ModelsTable />
      </CardContent>
    </Card>
  );
}
