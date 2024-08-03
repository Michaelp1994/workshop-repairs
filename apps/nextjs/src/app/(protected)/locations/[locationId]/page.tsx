import { type LocationID } from "@repo/validators/ids.validators";

import UpdateLocationForm from "../_components/UpdateLocationForm";

// import AssetsTable from "~/features/assets/components/AssetsTable";

interface ViewLocationPageProps {
  params: {
    locationId: LocationID;
  };
}

export default function ViewLocationPage({ params }: ViewLocationPageProps) {
  const locationId = Number(params.locationId);
  return (
    <div>
      <div>
        <div>
          <UpdateLocationForm locationId={locationId} />
        </div>
        <div>{/* <AssetsTable locationId={locationId} /> */}</div>
      </div>
    </div>
  );
}
