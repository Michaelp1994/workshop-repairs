interface ViewRepairLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{
    repairId: string;
  }>;
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
