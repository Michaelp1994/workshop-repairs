import { BackButton } from "~/app/_components/BackButton";
import {
  DetailsPage,
  DetailsPageToolbar,
  DetailsPageTitle,
} from "~/app/_components/DetailsPage";

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
