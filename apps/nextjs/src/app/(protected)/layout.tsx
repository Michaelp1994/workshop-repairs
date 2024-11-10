import { redirect } from "next/navigation";
import { Suspense } from "react";

import NavBar from "~/components/NavBar";
import NextBreadcrumb from "~/components/NextBreadcrumb";
import { isAuthenticated, onboardingCompleted } from "~/utils/isAuthenticated";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  if (!isAuthenticated()) {
    redirect(`/login`);
  }
  if (!onboardingCompleted()) {
    redirect(`/onboarding`);
  }

  return (
    <div className="grid h-full grid-rows-[auto_1fr]">
      <NavBar />
      <div className="p-4">
        <NextBreadcrumb />
        <main className="center mx-auto max-w-7xl">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
