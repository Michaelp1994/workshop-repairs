import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import InviteOthersForm from "./InviteOthersForm";

export default function InvitationPage() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardDescription></CardDescription>
        <CardTitle>Invite Others</CardTitle>
      </CardHeader>
      <CardContent>
        <InviteOthersForm />
      </CardContent>
    </Card>
  );
}
