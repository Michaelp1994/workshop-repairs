import type { EquipmentTypeID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import AssetsTable from "~/app/(protected)/assets/_components/AssetsTable";

interface EquipmentTypeAssetsSectionProps {
  equipmentTypeId: EquipmentTypeID;
}

export default function EquipmentTypeAssetsSection({
  equipmentTypeId,
}: EquipmentTypeAssetsSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <AssetsTable />
      </CardContent>
    </Card>
  );
}
