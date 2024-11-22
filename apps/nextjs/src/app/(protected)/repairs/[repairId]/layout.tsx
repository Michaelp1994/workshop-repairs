interface ViewRepairLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: {
    repairId: string;
  };
}

export default function ViewRepairLayout({
  children,
  modal,
}: ViewRepairLayoutProps) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
