"use client";
import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { Progress } from "@repo/ui/progress";
import { useRouter } from "next/navigation";
import { useState } from "react";

import CreateOrganizationForm from "./_components/CreateOrganizationForm";
import InviteOthersForm from "./_components/InviteOthersForm";

export default function OnboardingPage() {
  // TODO: query API to figure out what step we are on.
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [invitationId, setInvitationId] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-4">
      <Progress value={(step / 3) * 100} />
      {step === 1 ? (
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>Create Organization</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateOrganizationForm
              onSuccess={(invitationId) => {
                setStep(2);
                setInvitationId(invitationId);
              }}
            />
          </CardContent>
          <CardFooter>
            Looking to join a pre-existing organization? Click here
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-[500px]">
          <CardHeader>
            <CardDescription>
              <Button onClick={() => setStep(1)} variant="link">
                Go Back
              </Button>
            </CardDescription>
            <CardTitle>Invite Others</CardTitle>
          </CardHeader>
          <CardContent>
            <InviteOthersForm
              invitationId={invitationId}
              onSuccess={() => {
                router.push("/dashboard");
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
