import type { InitialDataTableState } from "@repo/ui/data-table";
import type { PartID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import PartModelsTable from "../../../../components/tables/PartModelsTable";

interface PartModelSectionProps {
  partId: PartID;
}

export default function PartModelSection({ partId }: PartModelSectionProps) {
  const initialState: InitialDataTableState = {
    pagination: { pageIndex: 0, pageSize: 5 },
    columnFilters: [{ id: "part_id", value: partId }],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Models</CardTitle>
      </CardHeader>
      <CardContent>
        <PartModelsTable initialState={initialState} />
      </CardContent>
    </Card>
  );
}
