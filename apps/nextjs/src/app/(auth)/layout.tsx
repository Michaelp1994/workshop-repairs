interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="grid h-full items-center justify-center">
      <div className="w-[500px] max-w-sm">{children}</div>
    </div>
  );
}
