import type { EquipmentTypeID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import ModelsTable from "~/app/(protected)/models/_components/ModelsTable";

interface EquipmentTypeModelsSectionProps {
  equipmentTypeId: EquipmentTypeID;
}

export default function EquipmentTypeModelsSection({
  equipmentTypeId,
}: EquipmentTypeModelsSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Models</CardTitle>
      </CardHeader>
      <CardContent>
        <ModelsTable />
      </CardContent>
    </Card>
  );
}
