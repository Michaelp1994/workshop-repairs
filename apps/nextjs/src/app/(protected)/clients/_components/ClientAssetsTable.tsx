import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import AssetsTable from "~/app/(protected)/assets/_components/AssetsTable";

interface ClientAssetsSectionProps {
  clientId: number;
}

export default async function ClientAssetsSection({
  clientId,
}: ClientAssetsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <AssetsTable />
      </CardContent>
    </Card>
  );
}
