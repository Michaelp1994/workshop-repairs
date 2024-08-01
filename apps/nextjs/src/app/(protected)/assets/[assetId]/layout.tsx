import { BackButton } from "~/components/BackButton";
import {
  DetailsPage,
  DetailsPageTitle,
  DetailsPageToolbar,
} from "~/components/DetailsPage";

interface AssetLayoutProps {
  params: {
    assetId: string;
  };
  children: React.ReactNode;
}

export default function AssetLayout({ children, params }: AssetLayoutProps) {
  const assetId = Number(params.assetId);
  return (
    <DetailsPage>
      <DetailsPageToolbar>
        <BackButton />
        <DetailsPageTitle>Asset {assetId}</DetailsPageTitle>
      </DetailsPageToolbar>
      {children}
    </DetailsPage>
  );
}
