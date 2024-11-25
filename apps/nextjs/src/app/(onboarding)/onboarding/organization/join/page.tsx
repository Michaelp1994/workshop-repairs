import {
  Card,
  CardContent,
  CardHeader,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";

import GoBackLink from "../../components/GoBackLink";
import JoinOrganizationForm from "./components/JoinOrganizationForm";

export default function OnboardingPage() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardHeaderText>
          <GoBackLink href="/onboarding/organization" />
          <CardTitle>Join an Organization</CardTitle>
        </CardHeaderText>
      </CardHeader>
      <CardContent>
        <JoinOrganizationForm />
      </CardContent>
    </Card>
  );
}
