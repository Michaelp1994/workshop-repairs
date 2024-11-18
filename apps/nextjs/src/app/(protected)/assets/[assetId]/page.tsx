import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";

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
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{assetId}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`${assetId}/edit`} variant="update">
            Edit
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <AssetRepairsSection assetId={assetId} />
      <AssetStatusSection assetId={assetId} />
      <ModelDetailsSection assetId={assetId} />
    </PageWrapper>
  );
}
