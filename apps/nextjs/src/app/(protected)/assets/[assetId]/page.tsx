import AssetDetailsSection from "./_components/AssetDetailsSection";
import AssetRepairsSection from "./_components/AssetRepairsSection";
import ModelDetails from "./_components/ModelDetailsSection";

import {
  DetailsPageGrid,
  DetailsPageMainColumn,
  DetailsPageSecondaryColumn,
} from "~/app/_components/DetailsPage";
import ArchiveSection from "~/app/_components/ArchiveSection";

interface ViewAssetPageProps {
  params: {
    assetId: string;
  };
}

export default function ViewAssetPage({ params }: ViewAssetPageProps) {
  const assetId = Number(params.assetId);
  return (
    <DetailsPageGrid>
      <DetailsPageMainColumn>
        <AssetDetailsSection assetId={assetId} />
        <AssetRepairsSection assetId={assetId} />
      </DetailsPageMainColumn>
      <DetailsPageSecondaryColumn>
        <ModelDetails assetId={assetId} />
        <ArchiveSection description="" href="" title="Archive Asset" />
      </DetailsPageSecondaryColumn>
    </DetailsPageGrid>
  );
}
