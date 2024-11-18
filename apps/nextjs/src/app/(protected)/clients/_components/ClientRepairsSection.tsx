import type { ClientID } from "@repo/validators/ids.validators";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import RepairsTable from "~/app/(protected)/repairs/_components/RepairsTable";

interface ClientRepairsSectionProps {
  clientId: ClientID;
}

export default function ClientRepairsSection({
  clientId,
}: ClientRepairsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Repairs</CardTitle>
      </CardHeader>
      <CardContent>
        <RepairsTable />
      </CardContent>
    </Card>
  );
}
