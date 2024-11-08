import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import ConfirmationForm from "./ConfirmationForm";

export default function VerifyEmailPage() {
  const email = "michael.poulgrain@gmail.com";
  return (
    <Card>
      <CardHeader>
        <CardTitle>Check your email for a code</CardTitle>
        <CardDescription>
          We’ve sent a 6-character code to{" "}
          <span className="font-bold">{email}</span>. The code expires shortly,
          so please enter it soon.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ConfirmationForm />
      </CardContent>
    </Card>
  );
}
