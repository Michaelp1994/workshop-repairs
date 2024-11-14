import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import { api } from "~/trpc/server";

export default async function OrganizationPage() {
  const organization = await api.organizations.get.query({});

  return (
    <Card>
      <CardHeader>
        <CardTitle>{organization.name}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
