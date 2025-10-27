import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import { api } from "~/trpc/client";

export const Route = createFileRoute("/(protected)/_layout/organization/")({
  component: OrganizationPage,
});

function OrganizationPage() {
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
