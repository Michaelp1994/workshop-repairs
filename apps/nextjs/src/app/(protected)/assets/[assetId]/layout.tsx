interface ViewAssetLayoutProps {
  params: {
    assetId: string;
  };
  modal: React.ReactNode;
  children: React.ReactNode;
}

export default async function ViewAssetLayout({
  children,
  modal,
}: ViewAssetLayoutProps) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
