import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import { api } from "~/trpc/server";

export default async function OrganizationPage() {
  const organization = await api.organizations.get({});

  return (
    <Card>
      <CardHeader>
        <CardTitle>{organization.name}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
