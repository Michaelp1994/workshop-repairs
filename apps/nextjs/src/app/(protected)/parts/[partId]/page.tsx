import { type PartID } from "@repo/validators/ids.validators";

import {
  DetailsPageGrid,
  DetailsPageMainColumn,
} from "~/components/DetailsPage";

import PartDetailSection from "../_components/PartDetailSection";
import PartModelSection from "../_components/PartModelSection";

interface ViewPartPageProps {
  params: {
    partId: PartID;
  };
}

export default function ViewPartPage({ params }: ViewPartPageProps) {
  const partId = Number(params.partId);

  return (
    <DetailsPageGrid>
      <DetailsPageMainColumn>
        <PartDetailSection partId={partId} />
        <PartModelSection partId={partId} />
      </DetailsPageMainColumn>
    </DetailsPageGrid>
  );
}
