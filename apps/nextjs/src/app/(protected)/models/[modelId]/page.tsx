import { type ModelID } from "@repo/validators/ids.validators";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/server";

import ModelAssetsTable from "../_components/ModelAssetsTable";
import ModelDetails from "../_components/ModelDetails";
import ModelImages from "../_components/ModelImages";
import ModelPartsTable from "../_components/ModelPartsTable";

interface ViewModelPageProps {
  params: {
    modelId: ModelID;
  };
}

export default async function ViewModelPage({ params }: ViewModelPageProps) {
  const modelId = Number(params.modelId);
  const model = await api.models.getById({ id: modelId });
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{model.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`${modelId}/edit`} variant="update">
            Update
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <ModelDetails modelId={modelId} />
      <ModelAssetsTable modelId={modelId} />
      <ModelPartsTable modelId={modelId} />
      <ModelImages modelId={modelId} />
    </PageWrapper>
  );
}
