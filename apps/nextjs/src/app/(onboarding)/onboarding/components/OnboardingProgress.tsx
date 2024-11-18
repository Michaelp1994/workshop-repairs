"use client";
import { Progress } from "@repo/ui/progress";

import { api } from "~/trpc/client";

export default function OnboardingProgress() {
  const [status] = api.userOnboardings.getStatus.useSuspenseQuery();

  const progress =
    ((Number(status.invitedUsers) +
      Number(status.welcomed) +
      Number(status.organizationChosen)) /
      3) *
    100;
  return <Progress className="mb-4" value={progress} />;
}
