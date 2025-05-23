interface ViewPartLayoutProps {
  params: Promise<{
    partId: string;
  }>;
  modal: React.ReactNode;
  children: React.ReactNode;
}

export default async function ViewPartLayout({
  children,
  modal,
}: ViewPartLayoutProps) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
