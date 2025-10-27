import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import SendInvitationsForm from "~/components/forms/SendInvitationsForm";
import SkipButton from "~/components/SkipButton";

export const Route = createFileRoute("/onboarding/invitation")({
  component: InvitationPage,
});

function InvitationPage() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Invite Others</CardTitle>
      </CardHeader>
      <CardContent>
        <SendInvitationsForm />
      </CardContent>
      <CardFooter>
        <SkipButton />
        {/* <InvitationLink /> */}
      </CardFooter>
    </Card>
  );
}
