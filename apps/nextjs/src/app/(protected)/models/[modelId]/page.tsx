import { type ModelID } from "@repo/validators/ids.validators";

import ArchiveSection from "~/components/ArchiveSection";
import {
  DetailsPageGrid,
  DetailsPageMainColumn,
  DetailsPageSecondaryColumn,
} from "~/components/DetailsPage";
import { getBaseUrl } from "~/utils/getBaseUrl";

import ModelAssetsSection from "./_components/ModelAssetsSection";
import ModelDetailsSection from "./_components/ModelDetailsSection/ModelDetailsSection";
import ModelImagesSection from "./_components/ModelImagesSection";
import ModelPartsSection from "./_components/ModelPartsSection/ModelPartsSection";

interface ViewModelPageProps {
  params: {
    modelId: ModelID;
  };
}

export default async function ViewModelPage({ params }: ViewModelPageProps) {
  const modelId = Number(params.modelId);
  return (
    <DetailsPageGrid>
      <DetailsPageMainColumn>
        <ModelDetailsSection modelId={modelId} />
        <ModelAssetsSection modelId={modelId} />
        <ModelPartsSection modelId={modelId} />
      </DetailsPageMainColumn>
      <DetailsPageSecondaryColumn>
        <ModelImagesSection modelId={modelId} />
        <ArchiveSection
          description="This will archive the model and prevent any future updates."
          href={`${getBaseUrl()}/models/${modelId}/archive`}
          title="Archive Model"
        />
      </DetailsPageSecondaryColumn>
    </DetailsPageGrid>
  );
}
