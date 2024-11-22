import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeaderText,
  CardTitle,
} from "@repo/ui/card";

import CompleteStepButton from "../components/CompleteStepButton";

export default function OnboardingPage() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardHeaderText>
          <CardTitle>Welcome to AssetRx</CardTitle>
          <CardDescription>
            AssetRx is a platform that helps you manage your assets, repairs,
            and maintenance in one place.
          </CardDescription>
        </CardHeaderText>
      </CardHeader>
      <CardContent>
        <p>
          Let&apos;s get started by setting up your organization and inviting
          your team members.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <CompleteStepButton />
      </CardFooter>
    </Card>
  );
}
