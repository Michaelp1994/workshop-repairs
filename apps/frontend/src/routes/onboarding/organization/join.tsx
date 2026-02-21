import {
  Card,
  CardContent,
  CardHeader,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";
import { ChevronLeft } from "@repo/ui/icons";
import { createFileRoute, Link } from "@tanstack/react-router";

import JoinOrganizationForm from "~/components/forms/JoinOrganizationForm";

export const Route = createFileRoute("/onboarding/organization/join")({
  component: JoinOrganizationPage,
});

function JoinOrganizationPage() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardHeaderText>
          <Link className="text-muted-foreground" to="/onboarding/organization">
            <ChevronLeft className="mr-1 inline-block" />
            Back
          </Link>
          <CardTitle>Join an Organization</CardTitle>
        </CardHeaderText>
      </CardHeader>
      <CardContent>
        <JoinOrganizationForm />
      </CardContent>
    </Card>
  );
}
