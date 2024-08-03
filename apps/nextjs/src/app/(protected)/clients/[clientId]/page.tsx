import {
  DetailsPageGrid,
  DetailsPageMainColumn,
  DetailsPageSecondaryColumn,
} from "~/components/DetailsPage";

import ClientAssetsSection from "../_components/ClientAssetsSection";
import ClientDetailsSection from "../_components/ClientDetailsSection";

interface ViewClientPageProps {
  params: {
    clientId: string;
  };
}

export default function ViewClientPage({ params }: ViewClientPageProps) {
  const clientId = Number(params.clientId);
  return (
    <DetailsPageGrid>
      <DetailsPageMainColumn>
        <ClientDetailsSection clientId={clientId} />
        <ClientAssetsSection clientId={clientId} />
      </DetailsPageMainColumn>
      <DetailsPageSecondaryColumn></DetailsPageSecondaryColumn>
    </DetailsPageGrid>
  );
}
