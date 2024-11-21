import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";

import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <Card>
      <CardHeader>
        <CardHeaderText>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send a code so that you can
            reset your password.
          </CardDescription>
        </CardHeaderText>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  );
}
