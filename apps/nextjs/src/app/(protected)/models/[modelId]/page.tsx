import { type ModelID } from "@repo/validators/ids.validators";

import { IconButton } from "~/app/(protected)/_components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/app/(protected)/_components/Page";
import { api } from "~/trpc/server";

import ModelAssetsTable from "../_components/ModelAssetsTable";
import ModelDetails from "../_components/ModelDetails";
import ModelImages from "../_components/ModelImages";
import ModelPartsTable from "../_components/ModelPartsTable";

interface ViewModelPageProps {
  params: Promise<{
    modelId: ModelID;
  }>;
}

export default async function ViewModelPage(props: ViewModelPageProps) {
  const params = await props.params;
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
          <IconButton href={`${modelId}/archive`} variant="delete">
            Archive
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
