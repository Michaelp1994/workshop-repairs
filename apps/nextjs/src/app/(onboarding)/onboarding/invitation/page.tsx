import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import SendInvitationsForm from "./components/SendInvitationsForm";

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
    </Card>
  );
}
