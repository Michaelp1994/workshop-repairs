import {
  DetailsPageGrid,
  DetailsPageMainColumn,
  DetailsPageSecondaryColumn,
} from "~/components/DetailsPage";

import ClientAssetsSection from "../_components/ClientAssetsSection";
import ClientDetailsSection from "../_components/ClientDetailsSection";
import ClientRepairsSection from "../_components/ClientRepairsSection/ClientRepairsSection";

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
        <ClientRepairsSection clientId={clientId} />
      </DetailsPageMainColumn>
      <DetailsPageSecondaryColumn></DetailsPageSecondaryColumn>
    </DetailsPageGrid>
  );
}
