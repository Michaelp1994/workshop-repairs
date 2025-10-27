import {
  Card,
  CardContent,
  CardHeader,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import JoinOrganizationForm from "~/components/forms/JoinOrganizationForm";
import GoBackLink from "~/components/GoBackLink";

export const Route = createFileRoute("/onboarding/organization/join")({
  component: JoinOrganizationPage,
});

function JoinOrganizationPage() {
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
