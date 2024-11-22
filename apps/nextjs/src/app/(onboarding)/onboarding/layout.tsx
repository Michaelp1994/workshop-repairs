import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import isAuthenticated from "~/auth/isAuthenticated";
import Logo from "~/components/Logo";
import ProfileAvatar from "~/components/ProfileAvatar";

import OnboardingProgress from "./components/OnboardingProgress";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!isAuthenticated()) {
    redirect("/login");
  }

  return (
    <div className="bg-muted/40 flex h-full min-h-screen flex-col">
      <div className="container flex justify-between pb-10 pt-10">
        <Logo />
        <ProfileAvatar />
      </div>
      <div className="flex flex-1 items-center">
        <div className="mx-auto flex max-w-[500px] flex-col gap-4">
          <OnboardingProgress />
          {children}
        </div>
      </div>
    </div>
  );
}
