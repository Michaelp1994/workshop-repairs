import {
  Card,
  CardContent,
  CardHeader,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";

import GoBackLink from "../../components/GoBackLink";
import CreateOrganizationForm from "./components/CreateOrganizationForm";

export default function OnboardingPage() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardHeaderText>
          <GoBackLink href="/onboarding/organization" />
          <CardTitle>Create Organization</CardTitle>
        </CardHeaderText>
      </CardHeader>
      <CardContent>
        <CreateOrganizationForm />
      </CardContent>
    </Card>
  );
}
