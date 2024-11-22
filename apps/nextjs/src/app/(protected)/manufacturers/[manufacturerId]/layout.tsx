interface ViewManufacturerLayoutProps {
  params: {
    manufacturerId: string;
  };
  modal: React.ReactNode;
  children: React.ReactNode;
}

export default async function ViewManufacturerLayout({
  children,
  modal,
}: ViewManufacturerLayoutProps) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
