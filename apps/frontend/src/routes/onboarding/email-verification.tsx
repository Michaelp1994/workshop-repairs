import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding/email-verification")({
  component: EmailVerificationPage,
});

function EmailVerificationPage() {
  return (
    <div>
      <h1>Email Verification</h1>
      <p>
        Almost there! We&apos;ve sent you an email with a link to verify your
        email address.
      </p>
      <p>Click the link in the email to verify your email address.</p>
    </div>
  );
}
