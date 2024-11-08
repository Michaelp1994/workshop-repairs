import Logo from "~/app/(public)/components/PublicNavBar/Logo";

export default function OnboardingLayout({ children }) {
  return (
    <div className="bg-muted/40 h-full min-h-screen">
      <div className="container pt-10">
        <Logo />
      </div>
      <div className="flex h-full items-center justify-center">
        <div className="mx-auto max-w-[500px]">{children}</div>
      </div>
    </div>
  );
}
