import { createFileRoute, Outlet } from "@tanstack/react-router";

import Logo from "~/components/Logo";
import OnboardingProgress from "~/components/OnboardingProgress";
import ProfileAvatar from "~/components/ProfileAvatar";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingLayout,
});

function OnboardingLayout() {
  return (
    <div className="bg-muted/40 flex h-full min-h-screen flex-col">
      <div className="container mx-auto flex justify-between px-4 pt-10 pb-10">
        <Logo />
        <ProfileAvatar />
      </div>
      <div className="flex flex-1 items-center">
        <div className="mx-auto flex max-w-[500px] flex-col gap-4">
          <OnboardingProgress />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
