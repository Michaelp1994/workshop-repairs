interface ViewModelLayoutProps {
  params: {
    modelId: string;
  };
  modal: React.ReactNode;
  children: React.ReactNode;
}

export default async function ViewModelLayout({
  children,
  modal,
}: ViewModelLayoutProps) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
