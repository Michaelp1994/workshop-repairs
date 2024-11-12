import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import GoBackLink from "../../components/GoBackLink";
import JoinOrganizationForm from "./components/JoinOrganizationForm";

export default function OnboardingPage() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <GoBackLink href="/onboarding/organization" />
        <CardTitle>Join an Organization</CardTitle>
      </CardHeader>
      <CardContent>
        <JoinOrganizationForm />
      </CardContent>
    </Card>
  );
}
