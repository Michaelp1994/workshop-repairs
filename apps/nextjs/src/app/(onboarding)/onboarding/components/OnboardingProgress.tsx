"use client";
import { Progress } from "@repo/ui/progress";

import { api } from "~/trpc/client";

export default function OnboardingProgress() {
  const { data, isError, isLoading } = api.userOnboardings.getStatus.useQuery();

  const progress = data
    ? ((Number(data.invitedUsers) +
        Number(data.welcomed) +
        Number(data.organizationChosen)) /
        3) *
      100
    : 0;
  return <Progress className="mb-4" value={progress} />;
}
