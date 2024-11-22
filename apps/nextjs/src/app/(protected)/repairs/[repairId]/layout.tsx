interface RepairLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: {
    repairId: string;
  };
}

export default function RepairLayout({
  children,
  modal,
  params,
}: RepairLayoutProps) {
  // const repairId = Number(params.repairId);
  return (
    <>
      {children}
      {modal}
    </>
  );
}
