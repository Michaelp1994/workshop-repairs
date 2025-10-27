import {
  Card,
  CardContent,
  CardHeader,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import CreateOrganizationForm from "~/components/forms/CreateOrganizationForm";
import GoBackLink from "~/components/GoBackLink";

export const Route = createFileRoute("/onboarding/organization/create")({
  component: CreateOrganizationPage,
});

function CreateOrganizationPage() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardHeaderText>
          <GoBackLink to="/onboarding/organization" />
          <CardTitle>Create Organization</CardTitle>
        </CardHeaderText>
      </CardHeader>
      <CardContent>
        <CreateOrganizationForm />
      </CardContent>
    </Card>
  );
}
