import type { PartID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import PartModelsTable from "../../../../components/tables/PartModelsTable";

interface PartModelSectionProps {
  partId: PartID;
}

export default function PartModelSection({ partId }: PartModelSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Models</CardTitle>
      </CardHeader>
      <CardContent>
        <PartModelsTable />
      </CardContent>
    </Card>
  );
}
