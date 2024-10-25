import LandingNavBar from "~/components/LandingNavBar";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
    <LandingNavBar />
      <div className="w-[500px] max-w-sm">{children}</div>
    </>
  );
}
