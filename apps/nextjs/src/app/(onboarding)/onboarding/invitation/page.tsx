import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import InvitationLink from "./components/InvitationLink";
import SendInvitationsForm from "./components/SendInvitationsForm";
import SkipButton from "./components/SkipButton";

export default function InvitationPage() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Invite Others</CardTitle>
        <CardDescription></CardDescription>
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
