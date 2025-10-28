import {
  Card,
  CardContent,
  CardHeader,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";
import { ChevronLeft } from "@repo/ui/icons";
import { createFileRoute, Link } from "@tanstack/react-router";

import CreateOrganizationForm from "~/components/forms/CreateOrganizationForm";

export const Route = createFileRoute("/onboarding/organization/create")({
  component: CreateOrganizationPage,
});

function CreateOrganizationPage() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardHeaderText>
          <Link className="text-muted-foreground" to="/onboarding/organization">
            <ChevronLeft className="mr-1 inline-block" />
            Back
          </Link>
          <CardTitle>Create Organization</CardTitle>
        </CardHeaderText>
      </CardHeader>
      <CardContent>
        <CreateOrganizationForm />
      </CardContent>
    </Card>
  );
}
