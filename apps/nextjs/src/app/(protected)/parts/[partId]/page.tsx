import { type PartID } from "@repo/validators/ids.validators";

import { IconButton } from "~/components/IconButton";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageTitle,
  PageWrapper,
} from "~/components/Page";
import { api } from "~/trpc/server";

import PartDetails from "../_components/PartDetails";
import PartModelsTable from "../_components/PartModelsTable";

interface ViewPartPageProps {
  params: {
    partId: PartID;
  };
}

export default async function ViewPartPage({ params }: ViewPartPageProps) {
  const partId = Number(params.partId);
  const part = await api.parts.getById({
    id: partId,
  });
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>{part.name}</PageTitle>
        </PageHeaderText>
        <PageHeaderActions>
          <IconButton href={`/parts/${partId}/edit`} variant="update">
            Update
          </IconButton>
          <IconButton href={`/parts/${partId}/archive`} variant="delete">
            Archive
          </IconButton>
        </PageHeaderActions>
      </PageHeader>
      <PartDetails partId={partId} />
      <PartModelsTable partId={partId} />
    </PageWrapper>
  );
}
