import { BackButton } from "~/components/BackButton";
import {
  DetailsPage,
  DetailsPageTitle,
  DetailsPageToolbar,
} from "~/components/DetailsPage";
import { api } from "~/trpc/server";

interface AssetLayoutProps {
  params: {
    assetId: string;
  };
  children: React.ReactNode;
}

export default async function AssetLayout({
  children,
  params,
}: AssetLayoutProps) {
  const assetId = Number(params.assetId);
  const asset = await api.assets.getById.query({ id: assetId });
  return (
    <DetailsPage>
      <DetailsPageToolbar>
        <BackButton />
        <DetailsPageTitle>Asset {asset.serialNumber}</DetailsPageTitle>
      </DetailsPageToolbar>
      {children}
    </DetailsPage>
  );
}
