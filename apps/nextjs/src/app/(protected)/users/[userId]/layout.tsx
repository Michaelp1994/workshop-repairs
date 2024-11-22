interface ViewLocationLayoutProps {
  params: {
    userId: string;
  };
  modal: React.ReactNode;
  children: React.ReactNode;
}

export default async function ViewUserLayout({
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
