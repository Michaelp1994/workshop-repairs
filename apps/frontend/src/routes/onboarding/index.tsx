import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding/")({
  component: OnboardingPage,
});

import { useNavigate } from "@tanstack/react-router";

import { api } from "~/trpc/client";

function OnboardingPage() {
  const navigate = useNavigate();
  const [data] = api.userOnboardings.getStatus.useSuspenseQuery();
  if (!data.welcomed) {
    navigate({ to: "/onboarding/welcome" });
  } else if (!data.organizationChosen) {
    navigate({ to: "/onboarding/organization" });
  } else if (!data.invitedUsers) {
    navigate({ to: "/onboarding/invitation" });
  } else {
    navigate({ to: "/dashboard" });
  }
}
