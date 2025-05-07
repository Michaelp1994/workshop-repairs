interface ViewLocationLayoutProps {
  params: Promise<{
    locationId: string;
  }>;
  modal: React.ReactNode;
  children: React.ReactNode;
}

export default async function ViewLocationLayout({
  children,
  modal,
}: ViewLocationLayoutProps) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
