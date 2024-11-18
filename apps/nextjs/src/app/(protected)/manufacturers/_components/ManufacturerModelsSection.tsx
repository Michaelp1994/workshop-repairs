import type { InitialDataTableState } from "@repo/ui/data-table";
import type { ManufacturerID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import ModelsTable from "~/components/tables/ModelsTable";

interface ManufacturerModelsSectionProps {
  manufacturerId: ManufacturerID;
}

export default function ManufacturerModelsSection({
  manufacturerId,
}: ManufacturerModelsSectionProps) {
  const initialState: InitialDataTableState = {
    pagination: { pageIndex: 0, pageSize: 5 },
    columnFilters: [{ id: "manufacturer_id", value: manufacturerId }],
    columnVisibility: {
      image: false,
      manufacturer_name: false,
      createdAt: false,
      updatedAt: false,
      manufacturer: false,
      model: false,
    },
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Models</CardTitle>
      </CardHeader>
      <CardContent>
        <ModelsTable initialState={initialState} />
      </CardContent>
    </Card>
  );
}
