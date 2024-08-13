import ArchiveSection from "~/components/ArchiveSection";
import {
  DetailsPageGrid,
  DetailsPageMainColumn,
  DetailsPageSecondaryColumn,
} from "~/components/DetailsPage";

import AssetDetailsSection from "../_components/AssetDetailsSection";
// import AssetLocationSection from "../_components/AssetLocationSection";
import ModelDetailsSection from "../_components/AssetModelSection";
import AssetRepairsSection from "../_components/AssetRepairsSection";
import AssetStatusSection from "../_components/AssetStatusSection";

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
        <AssetStatusSection assetId={assetId} />
        <ModelDetailsSection assetId={assetId} />
        {/* <AssetLocationSection assetId={assetId} /> */}
        <ArchiveSection description="" href="" title="Archive Asset" />
      </DetailsPageSecondaryColumn>
    </DetailsPageGrid>
  );
}
