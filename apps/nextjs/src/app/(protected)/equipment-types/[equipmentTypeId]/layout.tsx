interface ViewEquipmentTypeLayoutProps {
  params: {
    equipmentTypeId: string;
  };
  modal: React.ReactNode;
  children: React.ReactNode;
}

export default async function ViewEquipmentTypeLayout({
  children,
  modal,
}: ViewEquipmentTypeLayoutProps) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
