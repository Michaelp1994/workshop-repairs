import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import { api } from "~/trpc/client";

export default async function OrganizationPage() {
  const [organization] = api.organizations.get.useSuspenseQuery({});

  return (
    <Card>
      <CardHeader>
        <CardTitle>{organization.name}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
