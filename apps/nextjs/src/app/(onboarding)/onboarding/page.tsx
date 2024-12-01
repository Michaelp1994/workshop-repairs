import { redirect } from "next/navigation";

import { api } from "~/trpc/server";

export default async function OnboardingPage() {
  const data = await api.userOnboardings.getStatus();
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
