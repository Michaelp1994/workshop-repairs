import ModelImagesSection from "./_components/ModelImagesSection";
import { type ModelID } from "@repo/validators/ids.validators";
import {
  DetailsPageGrid,
  DetailsPageMainColumn,
  DetailsPageSecondaryColumn,
} from "~/app/_components/DetailsPage";
import ModelAssetsSection from "./_components/ModelAssetsSection";
import ModelPartsSection from "./_components/ModelPartsSection/ModelPartsSection";
import ModelDetailsSection from "./_components/ModelDetailsSection/ModelDetailsSection";
import ArchiveSection from "~/app/_components/ArchiveSection";
import { getBaseUrl } from "~/utils/getBaseUrl";

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
          title="Archive Model"
          description="This will archive the model and prevent any future updates."
          href={`${getBaseUrl()}/models/${modelId}/archive`}
        />
      </DetailsPageSecondaryColumn>
    </DetailsPageGrid>
  );
}
