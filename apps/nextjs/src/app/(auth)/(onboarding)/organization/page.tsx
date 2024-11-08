import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Progress } from "@repo/ui/progress";

import CreateOrganizationForm from "./_components/CreateOrganizationForm";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col gap-4">
      <Progress value={33} />
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Create Organization</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateOrganizationForm />
        </CardContent>
      </Card>
    </div>
  );
}
