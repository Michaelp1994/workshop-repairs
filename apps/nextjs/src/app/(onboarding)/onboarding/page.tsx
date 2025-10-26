import { redirect } from "next/navigation";

import { api } from "~/trpc/client";

export default async function OnboardingPage() {
  const [data] = api.userOnboardings.getStatus.useSuspenseQuery();
  if (!data.welcomed) {
    redirect("/onboarding/welcome");
  }
  if (!data.organizationChosen) {
    redirect("/onboarding/organization");
  }
  if (!data.invitedUsers) {
    redirect("/onboarding/invitation");
  }
  redirect("/dashboard");
}
