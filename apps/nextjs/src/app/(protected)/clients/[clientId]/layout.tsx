interface ViewClientLayoutProps {
  params: Promise<{
    clientId: string;
  }>;
  modal: React.ReactNode;
  children: React.ReactNode;
}

export default async function ViewClientLayout({
  children,
  modal,
}: ViewClientLayoutProps) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
