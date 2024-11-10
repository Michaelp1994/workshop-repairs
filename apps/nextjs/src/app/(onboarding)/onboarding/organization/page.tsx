import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import CreateOrganizationForm from "./_components/CreateOrganizationForm";

export default function OnboardingPage() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Create Organization</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateOrganizationForm />
      </CardContent>
    </Card>
  );
}
