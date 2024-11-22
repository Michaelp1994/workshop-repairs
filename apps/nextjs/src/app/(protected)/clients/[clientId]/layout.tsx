interface ViewClientLayoutProps {
  params: {
    clientId: string;
  };
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
