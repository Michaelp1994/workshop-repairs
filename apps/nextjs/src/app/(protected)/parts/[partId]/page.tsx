import { type PartID } from "@repo/validators/ids.validators";
import UpdatePartForm from "./UpdatePartForm";

// import PartToModelsTable from "~/features/partsToModels/components/PartToModelsTable";

interface ViewPartPageProps {
  params: {
    partId: PartID;
  };
}

export default function ViewPartPage({ params }: ViewPartPageProps) {
  const partId = Number(params.partId);

  return (
    <div>
      Part {partId}
      <div>
        <div>
          <UpdatePartForm partId={partId} />
        </div>
        <div>{/* <PartToModelsTable partId={partId} /> */}</div>
      </div>
    </div>
  );
}
