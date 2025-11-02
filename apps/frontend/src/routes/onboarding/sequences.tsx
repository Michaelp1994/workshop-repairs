import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import CreateOrganizationSequencesForm from "~/components/forms/CreateOrganizationSequencesForm";
import SkipButton from "~/components/SkipButton";

export const Route = createFileRoute("/onboarding/sequences")({
  component: SequencesPage,
});

function SequencesPage() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Set up Sequences</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateOrganizationSequencesForm />
      </CardContent>
      <CardFooter>
        <SkipButton />
        {/* <InvitationLink /> */}
      </CardFooter>
    </Card>
  );
}
