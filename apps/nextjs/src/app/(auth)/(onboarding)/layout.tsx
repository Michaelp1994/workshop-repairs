import Logo from "~/components/Logo";
import ProfileAvatar from "~/components/ProfileAvatar";

export default function OnboardingLayout({ children }) {
  return (
    <div className="bg-muted/40 flex h-full min-h-screen flex-col">
      <div className="container flex justify-between pb-10 pt-10">
        <Logo />
        <ProfileAvatar />
      </div>
      <div className="flex flex-1 items-center">
        <div className="mx-auto max-w-[500px]">{children}</div>
      </div>
    </div>
  );
}
